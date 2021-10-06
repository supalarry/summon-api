import verifySlackEvent from '../../../../source/functions/slack/verify';
import eventSample from './eventSample';
import { VALID_SIGNING_SECRET_FOR_EVENT_SAMPLE } from './constants';

describe('verifySlackEvent', () => {
    let event: any;

    beforeEach(() => {
        event = { ...eventSample };
    });

    it('should return true for valid slack event', () => {
        const signingSecret = VALID_SIGNING_SECRET_FOR_EVENT_SAMPLE;
        const valid = verifySlackEvent(event, signingSecret);
        expect(valid).toBe(true);
    });

    it('should return false for invalid signingSecret', () => {
        const signingSecret = 'millionbilliontrillion';
        const valid = verifySlackEvent(event, signingSecret);
        expect(valid).toBe(false);
    });

    it('should return false for undefined event', () => {
        const signingSecret = VALID_SIGNING_SECRET_FOR_EVENT_SAMPLE;
        event = undefined;
        const valid = verifySlackEvent(event, signingSecret);
        expect(valid).toBe(false);
    });

    it('should return false for event without a body', () => {
        const signingSecret = VALID_SIGNING_SECRET_FOR_EVENT_SAMPLE;
        delete event.body;
        const valid = verifySlackEvent(event, signingSecret);
        expect(valid).toBe(false);
    });

    it('should return false for event without headers', () => {
        const signingSecret = VALID_SIGNING_SECRET_FOR_EVENT_SAMPLE;
        delete event.headers;
        const valid = verifySlackEvent(event, signingSecret);
        expect(valid).toBe(false);
    });

    it('should return false for event without x-slack-request-timestamp header', () => {
        const signingSecret = VALID_SIGNING_SECRET_FOR_EVENT_SAMPLE;
        delete event.headers['x-slack-request-timestamp'];
        const valid = verifySlackEvent(event, signingSecret);
        expect(valid).toBe(false);
    });

    it('should return false for event without x-slack-signature header', () => {
        const signingSecret = VALID_SIGNING_SECRET_FOR_EVENT_SAMPLE;
        delete event.headers['x-slack-signature'];
        const valid = verifySlackEvent(event, signingSecret);
        expect(valid).toBe(false);
    });
});
