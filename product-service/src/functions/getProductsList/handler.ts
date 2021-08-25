import 'source-map-support/register';
import { APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getAll as getAllProducts } from '../../db/in-memory';
import { STATUS_CODES } from '../../utils/constants';

const { OK } = STATUS_CODES;

export const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  const products = getAllProducts();

  return buildResponse(OK, {
    ...products
  });
}

export const main = middyfy(getProductsList);
