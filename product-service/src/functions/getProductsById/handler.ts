import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getById as getProductById } from '../../db/in-memory';

const hello: APIGatewayProxyHandler = async (event) => {
  const id = event.pathParameters.productId;
  const product = getProductById(id);

  return formatJSONResponse({
    product
  });
}

export const main = middyfy(hello);
