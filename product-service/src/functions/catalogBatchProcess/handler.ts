import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import AWS from 'aws-sdk';
import { getInternalServerErrorMessage } from '../../../../import-service/src/utils/constants';
import { DatabaseConnection } from '../../db/db';
import * as productService from '../../services/product';
import { REGION } from '../../utils/constants';

export const catalogBatchProcess = async (event) => {
  let isConnected = false;

  try {
    console.log('[EVENT]', event);
    const { Records } = event;

    const sns = new AWS.SNS({ region: REGION });

    await DatabaseConnection.createClient();
    await DatabaseConnection.connect();

    isConnected = true;

    const products = await productService.addManyProducts(DatabaseConnection.client, Records);

    console.log('[PRODUCTS]', products);

    const snsMessage = {
      Subject: 'Some products were added to database',
      Message: `Plus ${Records.length} product(s) in DB`,
      TopicArn: 'arn:aws:sns:eu-west-1:379232632208:catalog-items-sns-topic'
    };

    await sns.publish(snsMessage).promise();

    console.log('Info about products was sent to email');

  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    console.log(message);
  } finally {
    if (isConnected) await DatabaseConnection.disconnect();
  }
};

export const main = middyfy(catalogBatchProcess);
