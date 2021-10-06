import { handler } from '../../../../source/functions/slack/events';
import { isApiGatewayResponse } from '../../../utils/validators';
import { Context, Callback } from 'aws-lambda';
import { APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy';
import { VALID_SIGNING_SECRET_FOR_EVENT_SAMPLE } from './constants';
import eventSample from './eventSample';

describe('events', () => {
    let event: any;
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules(); // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
        event = { ...eventSample };
    });

    it('should return 200 and body challenge given url_verification request', async () => {
        // set environment variable to match event
        process.env.SLACK_SIGNING_SECRET = VALID_SIGNING_SECRET_FOR_EVENT_SAMPLE;
        // execute
        const res = (await handler(event, {} as Context, (() => {}) as Callback)) as APIGatewayProxyResult;
        // evaluate
        expect(res).toBeDefined();
        expect(isApiGatewayResponse(res)).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe(JSON.parse(event.body).challenge);
    });

    it('should return 401 given invalid SLACK_SIGNING_SECRET', async () => {
        // set environment variable to match event
        process.env.SLACK_SIGNING_SECRET = 'millionbilliontrillion';
        // execute
        const res = (await handler(event, {} as Context, (() => {}) as Callback)) as APIGatewayProxyResult;
        // evaluate
        expect(res).toBeDefined();
        expect(isApiGatewayResponse(res)).toBe(true);
        expect(res.statusCode).toBe(401);
        expect(res.body).toBe('{"message":"Unauthorized"}');
    });

    it('should return 401 given missing url_verification header', async () => {
        // set environment variable to match event
        process.env.SLACK_SIGNING_SECRET = VALID_SIGNING_SECRET_FOR_EVENT_SAMPLE;
        // execute
        event.body = event.body.replace('url_verification', 'scam');
        const res = (await handler(event, {} as Context, (() => {}) as Callback)) as APIGatewayProxyResult;
        // evaluate
        expect(res).toBeDefined();
        expect(isApiGatewayResponse(res)).toBe(true);
        expect(res.statusCode).toBe(401);
        expect(res.body).toBe('{"message":"Unauthorized"}');
    });

    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });
});
