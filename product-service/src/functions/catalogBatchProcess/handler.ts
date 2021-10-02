import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { getInternalServerErrorMessage } from '../../../../import-service/src/utils/constants';

export const catalogBatchProcess = async (event) => {

  try {

  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    console.log(message);
  }
};

export const main = middyfy(catalogBatchProcess);
