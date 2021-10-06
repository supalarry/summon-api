import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '../../helpers/build-response';
import verifySlackEvent from './verify';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response;
    try {
        if (verifySlackEvent(event)) {
            const eventBody = event.body;
            const parsedBody = await JSON.parse(eventBody || '');
            if (parsedBody.type === 'url_verification') {
                response = buildResponse(200, `${parsedBody.challenge}`);
            } else {
                response = buildResponse(404, 'Invalid request');
            }
        } else {
            response = buildResponse(401, 'Unauthorized');
        }
    } catch (err) {
        response = buildResponse(500, 'An error occured');
    }
    return response;
};
