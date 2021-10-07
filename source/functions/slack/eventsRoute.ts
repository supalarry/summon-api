import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '../../helpers/build-response';
import verifySlackEvent from './verify';
import { Context, Callback } from 'aws-lambda';
import processRequest from './eventsController';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult> => {
    let response;
    try {
        if (verifySlackEvent(event)) {
            const eventBody = event.body;
            const parsedBody = await JSON.parse(eventBody || '');
            // This is special way how Slack verifies the app
            if (parsedBody.type === 'url_verification') {
                response = buildResponse(200, `${parsedBody.challenge}`);
            } else if (parsedBody.type === 'event_callback') {
                // Call controller processing actual event
                processRequest(parsedBody.body);
                response = buildResponse(200, { message: 'OK' });
            } else {
                response = buildResponse(404, { message: 'Invalid request' });
            }
        } else {
            response = buildResponse(401, { message: 'Unauthorized' });
        }
    } catch (err) {
        response = buildResponse(500, { message: 'An error occured' });
    }
    return response;
};
