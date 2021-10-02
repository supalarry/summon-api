import { APIGatewayProxyResult } from '../../node_modules/@types/aws-lambda/trigger/api-gateway-proxy';

const isApiGatewayResponse = (response: APIGatewayProxyResult | void) => {
    if (!response) return false;

    const { body, statusCode, headers } = response;
    if (!body || !statusCode || !headers) return false;
    if (typeof body !== 'string') return false;
    if (typeof statusCode !== 'number') return false;
    if (!isCorrectHeaders(headers)) return false;

    return true;
};

const isCorrectHeaders = (headers: { [header: string]: string | number | boolean }) => {
    if (headers['Content-Type'] !== 'application/json') return false;
    if (headers['Access-Control-Allow-Methods'] !== '*') return false;
    if (headers['Access-Control-Allow-Origin'] !== '*') return false;

    return true;
};

export { isApiGatewayResponse, isCorrectHeaders };
