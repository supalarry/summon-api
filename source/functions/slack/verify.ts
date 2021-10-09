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
    if (!slackEvent || !slackEvent.body || !slackEvent.headers || !slackEvent.headers['x-slack-request-timestamp'] || !slackEvent.headers['x-slack-signature']) {
        return false;
    }
    // Create expected signature
    const body = slackEvent.body;
    Logger.debugNestedObject(NAMESPACE, 'Event body', body);
    const headers = makeObjectKeysValuesLowerCase(slackEvent.headers);
    Logger.debugNestedObject(NAMESPACE, 'Event headers lowercased', headers);
    const timestamp = `${headers['x-slack-request-timestamp']}`;
    Logger.debug(NAMESPACE, `timestamp: ${timestamp}`);
    const baseString = `${signatureVersion}:${timestamp}:${body}`;
    Logger.debug(NAMESPACE, `baseString: ${timestamp}`);
    const hmac = crypto.createHmac(SHA_VERSION, signingSecret).update(baseString).digest(DIGEST_ENCODING);
    Logger.debug(NAMESPACE, `hmac: ${timestamp}`);
    const exptectedSignature = `${signatureVersion}=${hmac}`;
    Logger.debug(NAMESPACE, `exptectedSignature: ${exptectedSignature}`);
    Logger.debug(NAMESPACE, `x-slack-signature: ${headers['x-slack-signature']}`);
    // Compare with received signature
    return exptectedSignature === headers['x-slack-signature'];
}
export default verifySlackEvent;
