import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getById as getProductById } from '../../db/in-memory';
import { APIGatewayProxyResult } from 'aws-lambda';
import { STATUS_CODES } from '../../utils/constants';
import { getBadRequestMessage, getInternalServerErrorMessage, getNotFoundMessage } from '../../utils/responseMessages';

export const getProductsById = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { productId: id } = event.pathParameters;

    if (!id) {
      return buildResponse(STATUS_CODES.BAD_REQUEST, { message: getBadRequestMessage(id) });
    }

    const product = getProductById(id);

    if (product) {
      return buildResponse(STATUS_CODES.OK, {
        ...product
      });
    }

    return buildResponse(STATUS_CODES.NOT_FOUND, {
      message: getNotFoundMessage(id)
    });
  } catch (e) {
    return buildResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, {
      message: getInternalServerErrorMessage(e)
    });
  }

}

export const main = middyfy(getProductsById);
