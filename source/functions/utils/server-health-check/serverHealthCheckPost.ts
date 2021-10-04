import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '../../../helpers/build-response';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response;
    try {
        const eventBody = event.body;
        const parsedBody = await JSON.parse(eventBody || '');
        response = buildResponse(200, `${parsedBody.message} Pong`);
    } catch (err) {
        response = buildResponse(500, 'An error occured');
    }
    return response;
};
