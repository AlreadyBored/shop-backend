import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getById as getProductById } from '../../db/in-memory';
import { APIGatewayProxyResult } from 'aws-lambda';
import { STATUS_CODES, RESPONSE_MESSAGES } from '../../utils/constants';

export const getProductsById = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { productId: id } = event.pathParameters;

    if (!id) {
      return buildResponse(STATUS_CODES.BAD_REQUEST, { message: RESPONSE_MESSAGES.BAD_REQUEST });
    }

    const product = getProductById(id);

    if (product) {
      return buildResponse(STATUS_CODES.OK, {
        ...product
      });
    }

    return buildResponse(STATUS_CODES.NOT_FOUND, {
      message: RESPONSE_MESSAGES.NOT_FOUND
    });
  } catch (e) {
    return buildResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, {
      message: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR
    });
  }

}

export const main = middyfy(getProductsById);
