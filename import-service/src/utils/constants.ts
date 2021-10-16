export enum STATUS_CODES {
    OK = 200,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
};

export const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

export const API_GATEWAY_RESPONSE_PARAMS = {
    'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
    'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
};

export const BUCKET_NAME = 'import-service-bucket-rss';
export const REGION = 'eu-west-1';
export const SIGNED_URL_EXPIRATION = 45;
export const UPLOAD_PREFIX = 'uploaded';
export const PARSE_PREFIX = 'parsed';

export const getInternalServerErrorMessage = err => `Something went wrong on server side: ${err}`;
