import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { getInternalServerErrorMessage } from '../../../../import-service/src/utils/constants';
import { DatabaseConnection } from '../../db/db';
import * as productService from '../../services/product';

export const catalogBatchProcess = async (event) => {
  let isConnected = false;
  
  try {
    console.log('[EVENT]', event);

    await DatabaseConnection.createClient();
    await DatabaseConnection.connect();

    isConnected = true;

    const products = await productService.addManyProducts(DatabaseConnection.client, event.body);

    console.log('[PRODUCTS]', products);

  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    console.log(message);
  } finally {
    if (isConnected) await DatabaseConnection.disconnect();
  }
};

export const main = middyfy(catalogBatchProcess);
