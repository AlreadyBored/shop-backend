import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getAll as getAllProducts } from '../../db/in-memory';

const hello: APIGatewayProxyHandler = async () => {
  const products = getAllProducts();

  return formatJSONResponse({
    products
  });
}

export const main = middyfy(hello);
