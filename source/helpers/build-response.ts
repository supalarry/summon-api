// TODO allow body to be object
const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*'
};

const buildResponse = (statusCode: number, body: string | object, headers?: { [header: string]: boolean | number | string }) => {
    if (typeof body !== 'string') {
        body = JSON.stringify(body);
    }
    if (!headers) {
        headers = defaultHeaders;
    }
    return {
        statusCode,
        body,
        headers
    };
};

export { buildResponse, defaultHeaders };
