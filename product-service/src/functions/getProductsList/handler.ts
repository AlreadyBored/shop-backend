import 'source-map-support/register';
import { APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getAll as getAllProducts } from '../../db/in-memory';
import { STATUS_CODES, RESPONSE_MESSAGES } from '../../utils/constants';

export const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = getAllProducts();

    return buildResponse(STATUS_CODES.OK, {
      ...products
    });
  } catch (e) {
    return buildResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, {
      message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
    });
  }
}

export const main = middyfy(getProductsList);
