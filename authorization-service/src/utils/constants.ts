export enum STATUS_CODES {
    OK = 200,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    UNAUTHORIZED = 401
};

export const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

export const REGION = 'eu-west-1';

export const getInternalServerErrorMessage = err => `Something went wrong on server side: ${err}`;
