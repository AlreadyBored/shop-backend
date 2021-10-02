import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { getInternalServerErrorMessage } from '../../../../import-service/src/utils/constants';
import { DatabaseConnection } from '../../db/db';
import * as productService from '../../services/product';

export const catalogBatchProcess = async (event) => {
  let isConnected = false;

  try {
    console.log('[EVENT]', event);
    const { Records } = event;

    await DatabaseConnection.createClient();
    await DatabaseConnection.connect();

    isConnected = true;

    const product = await productService.addManyProducts(DatabaseConnection.client, Records);

    console.log('[PRODUCTS]', product);

  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    console.log(message);
  } finally {
    if (isConnected) await DatabaseConnection.disconnect();
  }
};

export const main = middyfy(catalogBatchProcess);
