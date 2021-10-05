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

    const productsCount = Records.length;

    console.log('[PRODUCTS]', products);

    const snsMessage = {
      Subject: 'Some products were added to database',
      Message: `Plus ${productsCount} product(s) in DB`,
      TopicArn: process.env.SNS_TOPIC_ARN,
      MessageAttributes: {
        productsCount: {
          DataType: 'Number',
          StringValue: `${productsCount}`
        }
      }
    };

    await sns.publish(snsMessage).promise();

    console.log('Info about products was sent to email');

    return {
      products,
      snsMessage
    };

  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    console.log(message);
  } finally {
    if (isConnected) await DatabaseConnection.disconnect();
  }
};

export const main = middyfy(catalogBatchProcess);
