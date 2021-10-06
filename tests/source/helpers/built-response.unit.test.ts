import { buildResponse, defaultHeaders } from '../../../source/helpers/build-response';

describe('buildResponse', () => {
    it('should attach defaultHeaders', () => {
        const statusCode = 200;
        const body = 'OK';
        const response = buildResponse(statusCode, body);
        expect(response).toEqual({
            statusCode: 200,
            body: 'OK',
            headers: defaultHeaders
        });
    });

    it('should stringify body object', () => {
        const statusCode = 200;
        const body = { message: 'OK' };
        const response = buildResponse(statusCode, body);
        expect(response).toEqual({
            statusCode: 200,
            body: '{"message":"OK"}',
            headers: defaultHeaders
        });
    });
});
