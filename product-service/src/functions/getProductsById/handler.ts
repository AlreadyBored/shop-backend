import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getById as getProductById } from '../../db/in-memory';
import { APIGatewayProxyResult } from 'aws-lambda';

export const getProductsById = async (event): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.productId;
  
  const product = getProductById(id);

  return formatJSONResponse({
    ...product
  });
}

export const main = middyfy(getProductsById);
