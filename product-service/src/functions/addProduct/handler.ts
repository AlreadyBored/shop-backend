import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import { STATUS_CODES } from '../../utils/constants';
import { isBodyValid } from '../../utils/validateRequestBody';
import { addProductBadRequestMessage, getInternalServerErrorMessage } from '../../utils/responseMessages';
import * as productService from '../../services/product';

export const addProduct = async (event): Promise<APIGatewayProxyResult> => {
  try {
    if (!isBodyValid(event.body)) {
      return buildResponse(STATUS_CODES.BAD_REQUEST, { message: addProductBadRequestMessage });
    }

    const product = await productService.addProduct(event.body);

    if (product) {
      return buildResponse(STATUS_CODES.OK, {
        ...product
      });
    }

  } catch (e) {
    return buildResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, {
      message: getInternalServerErrorMessage(e)
    });
  }

};

export const main = middyfy(addProduct);
