import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const response = {
            statusCode: 200,
            body: 'Pong'
        };
        return response;
    } catch (err) {
        return {
            statusCode: 500,
            body: 'An error occured'
        };
    }
};
