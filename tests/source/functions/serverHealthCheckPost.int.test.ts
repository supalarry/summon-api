import { handler } from '../../../source/functions/serverHealthCheckPost';
import APIGatewayRequestMockGenerator from '../../utils/APIGatewayRequestMockGenerator';
import { isApiGatewayResponse } from '../../utils/validators';
import { Context, Callback } from 'aws-lambda';
import { APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';

describe('serverHealthCheckPost', () => {
    it('should return Ping Pong', async () => {
        // setup
        const event = APIGatewayRequestMockGenerator({
            httpMethod: 'POST',
            body: { message: 'Ping' }
        });
        // execute
        const res = (await handler(event, {} as Context, (() => {}) as Callback)) as APIGatewayProxyResult;
        // evaluate
        expect(res).toBeDefined();
        expect(isApiGatewayResponse(res)).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe('Ping Pong');
    });
});
