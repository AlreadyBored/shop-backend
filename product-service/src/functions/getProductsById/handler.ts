import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import { STATUS_CODES } from '../../utils/constants';
import { getBadRequestMessage, getInternalServerErrorMessage, getNotFoundMessage } from '../../utils/responseMessages';
import * as productService from '../../services/product';

export const getProductsById = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { productId: id } = event.pathParameters;

    if (!id) {
      return buildResponse(STATUS_CODES.BAD_REQUEST, { message: getBadRequestMessage(id) });
    }
    
    await productService.fillDB();
    const product = await productService.getSingleProduct(id);

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
