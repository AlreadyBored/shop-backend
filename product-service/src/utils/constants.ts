export enum STATUS_CODES {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404
};

export const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

export enum RESPONSE_MESSAGES {
    BAD_REQUEST = 'Bad request',
    NOT_FOUND = 'Not_found',
    INTERNAL_SERVER_ERROR = 'Something went wrong on server side'
}