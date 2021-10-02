import { handler } from '../../../source/functions/serverHealthCheckGet';
import APIGatewayRequestMockGenerator from '../../utils/APIGatewayRequestMockGenerator';
import { isApiGatewayResponse } from '../../utils/validators';
import { Context, Callback } from 'aws-lambda';
import { APIGatewayProxyResult } from '../../../node_modules/@types/aws-lambda/trigger/api-gateway-proxy';

describe('serverHealthCheckGet', () => {
    it('should return pong', async () => {
        // setup
        const event = APIGatewayRequestMockGenerator({
            httpMethod: 'GET',
            body: null
        });
        // execute
        const res = (await handler(event, {} as Context, (() => {}) as Callback)) as APIGatewayProxyResult;
        // evaluate
        expect(res).toBeDefined();
        expect(isApiGatewayResponse(res)).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe('Pong pong');
    });
});
