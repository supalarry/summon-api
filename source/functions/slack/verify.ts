import crypto from 'crypto';
import { APIGatewayProxyEvent } from 'aws-lambda';
import makeObjectKeysValuesLowerCase from '../../helpers/strings';
import Logger from '../../services/logger';

const NAMESPACE = 'verify';

const SHA_VERSION = 'sha256';
const DIGEST_ENCODING = 'hex';

function verifySlackEvent(slackEvent: APIGatewayProxyEvent, signingSecret = `${process.env.SLACK_SIGNING_SECRET}`, signatureVersion = 'v0'): boolean {
    // Validate Slack event
    Logger.debugNestedObject(NAMESPACE, 'Received event:', slackEvent);
    Logger.info(NAMESPACE, `Environment signing secret: ${signingSecret}`);
    if (!slackEvent || !slackEvent.body || !slackEvent.headers || !slackEvent.headers['x-slack-request-timestamp'] || !slackEvent.headers['x-slack-signature']) {
        return false;
    }
    // Create expected signature
    const body = slackEvent.body;
    const headers = makeObjectKeysValuesLowerCase(slackEvent.headers);
    const timestamp = `${headers['x-slack-request-timestamp']}`;
    const baseString = `${signatureVersion}:${timestamp}:${body}`;
    const hmac = crypto.createHmac(SHA_VERSION, signingSecret).update(baseString).digest(DIGEST_ENCODING);
    const exptectedSignature = `${signatureVersion}=${hmac}`;
    // Compare with received signature
    return exptectedSignature === headers['x-slack-signature'];
}
export default verifySlackEvent;
