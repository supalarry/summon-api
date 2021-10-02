import { APIGatewayProxyEventQueryStringParameters, APIGatewayProxyEventPathParameters, APIGatewayProxyEventStageVariables } from '../../node_modules/@types/aws-lambda/trigger/api-gateway-proxy';

const APIGatewayRequestMockGenerator = ({
    body,
    httpMethod,
    path = '',
    queryStringObject = null,
    pathParametersObject = null,
    stageVariables = null
}: {
    body: string | null;
    httpMethod: string;
    path?: string;
    queryStringObject?: APIGatewayProxyEventQueryStringParameters | null;
    pathParametersObject?: APIGatewayProxyEventPathParameters | null;
    stageVariables?: APIGatewayProxyEventStageVariables | null;
}) => {
    const request = {
        body: body ? JSON.stringify(body) : null,
        headers: {},
        multiValueHeaders: {},
        httpMethod,
        isBase64Encoded: false,
        path,
        pathParameters: pathParametersObject || null,
        queryStringParameters: queryStringObject || null,
        multiValueQueryStringParameters: null,
        stageVariables,
        requestContext: {
            accountId: '',
            apiId: '',
            httpMethod,
            identity: {
                accessKey: '',
                accountId: '',
                apiKey: '',
                apiKeyId: '',
                caller: '',
                cognitoAuthenticationProvider: '',
                cognitoAuthenticationType: '',
                cognitoIdentityId: '',
                cognitoIdentityPoolId: '',
                principalOrgId: '',
                sourceIp: '',
                user: '',
                userAgent: '',
                userArn: '',
                clientCert: null
            },
            path,
            stage: '',
            requestId: '',
            requestTimeEpoch: 3,
            resourceId: '',
            resourcePath: '',
            authorizer: {},
            protocol: ''
        },
        resource: ''
    };
    return request;
};

export default APIGatewayRequestMockGenerator;
