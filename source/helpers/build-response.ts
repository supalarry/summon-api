const buildResponse = (statusCode: number, body: string, headers?: { [header: string]: boolean | number | string }) => {
    if (!headers) {
        headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        };
    }
    return {
        statusCode,
        body,
        headers
    };
};

export { buildResponse };
