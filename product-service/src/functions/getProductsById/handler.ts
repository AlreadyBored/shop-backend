import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';
import { STATUS_CODES } from '../../utils/constants';
import { getSingleProductBadRequestMessage, getInternalServerErrorMessage, getNotFoundMessage } from '../../utils/responseMessages';
import { logRequest } from '../../utils/consoleLogger';
import * as productService from '../../services/product';
import { DatabaseConnection } from '../../db/db';

export const getProductsById = async (event): Promise<APIGatewayProxyResult> => {
  let isConnected = false;
  try {
    const { body, pathParameters, queryStringParameters, headers } = event;
    logRequest({ body, pathParameters, queryStringParameters, headers });

    const { productId: id } = event.pathParameters;

    if (!id) {
      return buildResponse(STATUS_CODES.BAD_REQUEST, { message: getSingleProductBadRequestMessage(id) });
    }

    await DatabaseConnection.createClient();
    await DatabaseConnection.connect();

    isConnected = true;

    const product = await productService.getSingleProduct(DatabaseConnection.client, id);

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
  } finally {
    if (isConnected) await DatabaseConnection.disconnect();
  }
}

export const main = middyfy(getProductsById);
