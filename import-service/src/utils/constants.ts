export enum STATUS_CODES {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
};

export const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

export const BUCKET_NAME = 'import-service-bucket';
export const REGION = 'eu-west-1';
export const SIGNED_URL_EXPIRATION = 45;
export const UPLOAD_PREFIX = 'uploaded';