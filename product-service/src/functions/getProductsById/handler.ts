import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getById as getProductById } from '../../db/in-memory';
import { APIGatewayProxyResult } from 'aws-lambda';
import { STATUS_CODES } from '../../utils/constants';

const { OK, BAD_REQUEST, NOT_FOUND } = STATUS_CODES;

export const getProductsById = async (event): Promise<APIGatewayProxyResult> => {
  const { productId: id } = event.pathParameters;

  if (!id) {
    return buildResponse(BAD_REQUEST, { message: 'Bad request' });
  }

  const product = getProductById(id);

  if (product) {
    return buildResponse(OK, {
      ...product
    });
  }

  return buildResponse(NOT_FOUND, {
    message: 'Not found'
  })
}

export const main = middyfy(getProductsById);
