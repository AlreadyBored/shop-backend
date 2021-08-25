import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import { FromSchema } from "json-schema-to-ts";
import { CORS_HEADERS } from '../utils/constants';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: CORS_HEADERS,
  }
}
