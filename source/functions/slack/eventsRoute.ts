import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '../../helpers/build-response';
import verifySlackEvent from './verify';
import { Context, Callback } from 'aws-lambda';
import processRequest from './eventsController';
import Logger from '../../services/logger';

const NAMESPACE = 'eventsRoute';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult> => {
    let response;
    try {
        Logger.info(NAMESPACE, 'Event received');
        if (verifySlackEvent(event)) {
            Logger.info(NAMESPACE, 'Event successfully verified as Slack event');
            const eventBody = event.body;
            const parsedBody = await JSON.parse(eventBody || '');
            // This is special way how Slack verifies the app
            if (parsedBody.type === 'url_verification') {
                Logger.info(NAMESPACE, 'Event is of type: url_verification');
                response = buildResponse(200, `${parsedBody.challenge}`);
            } else if (parsedBody.type === 'event_callback') {
                Logger.info(NAMESPACE, 'Event is of type: event_callback');
                // Call controller processing actual event
                processRequest(parsedBody.body);
                response = buildResponse(200, { message: 'OK' });
            } else {
                response = buildResponse(404, { message: 'Invalid request' });
                Logger.info(NAMESPACE, `Event is of unknown type: ${parsedBody.type}`);
            }
        } else {
            response = buildResponse(401, { message: 'Unauthorized' });
            Logger.info(NAMESPACE, 'Event is unauthorized. It is not sent by Slack.');
        }
    } catch (err) {
        response = buildResponse(500, { message: 'An error occured' });
        Logger.error(NAMESPACE, 'An error occured: ', err.message);
    }
    return response;
};
