import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '../helpers/build-response';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let response;
    try {
        response = buildResponse(200, 'Pong');
    } catch (err) {
        response = buildResponse(500, 'An error occured');
    }
    return response;
};
