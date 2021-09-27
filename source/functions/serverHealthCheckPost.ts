import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const eventBody = event.body;
        const parsedBody = await JSON.parse(eventBody || '');
        return {
            statusCode: 200,
            body: `Pong ${parsedBody}`
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: 'An error occured'
        };
    }
};
