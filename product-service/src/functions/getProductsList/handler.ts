import 'source-map-support/register';
import { APIGatewayProxyResult } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getAll as getAllProducts } from '../../db/in-memory';

export const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  const products = getAllProducts();

  return formatJSONResponse({
    ...products
  });
}

export const main = middyfy(getProductsList);
