import 'source-map-support/register';
import { APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { STATUS_CODES } from '../../utils/constants';
import { getInternalServerErrorMessage } from '../../utils/responseMessages';
import { logRequest } from '../../utils/consoleLogger';
import * as productService from '../../services/product';
import { DatabaseConnection } from '../../db/db';

export const getProductsList = async (event): Promise<APIGatewayProxyResult> => {
  let isConnected = false;
  try {
    const { body, pathParameters, queryStringParameters, headers } = event;
    logRequest({ body, pathParameters, queryStringParameters, headers });

    await DatabaseConnection.createClient();
    await DatabaseConnection.connect();

    isConnected = true;

    const products = await productService.getAllProducts(DatabaseConnection.client);

    return buildResponse(STATUS_CODES.OK, {
      products
    });
  } catch (e) {
    return buildResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, {
      message: getInternalServerErrorMessage(e)
    });
  } finally {
    if (isConnected) await DatabaseConnection.disconnect();
  }
}

export const main = middyfy(getProductsList);
