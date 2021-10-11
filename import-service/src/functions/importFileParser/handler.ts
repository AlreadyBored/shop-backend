import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { BUCKET_NAME, REGION, STATUS_CODES, getInternalServerErrorMessage, UPLOAD_PREFIX, PARSE_PREFIX } from '../../utils/constants';
import AWS from 'aws-sdk';
import cvs from 'csv-parser';

const { ACCEPTED, INTERNAL_SERVER_ERROR } = STATUS_CODES

const importFileParser = async (event): Promise<APIGatewayProxyResult> => {

  try {
    const { Records } = event;
    console.log('[EVENT]', event);

    const s3Bucket = new AWS.S3({ region: REGION });
    const sqs = new AWS.SQS({ region: REGION });

    Records.forEach(record => {
      console.log('[RECORD]', record);

      const { key } = record.s3.object;

      const fileName = decodeURIComponent(key);

      const params = {
        Bucket: BUCKET_NAME,
        Key: fileName
      };

      const s3Object = s3Bucket.getObject(params);

      const s3ReadableStream = s3Object.createReadStream();

      s3ReadableStream.pipe(cvs())
        .on('data', async (chunk) => {

          const chunkStringified = JSON.stringify(chunk);

          console.log(`Recieved part of data ${chunkStringified}`);

          const message = {
            QueueUrl: process.env.SQS_URL,
            MessageBody: chunkStringified
          };

          await sqs.sendMessage(message).promise();
        })
        .on('error', (e) => {
          throw new Error(`Error occured: ${e}`);
        })
        .on('end', async () => {
          const sourceName = `${BUCKET_NAME}/${fileName}`;
          const destName = fileName.replace(UPLOAD_PREFIX, PARSE_PREFIX);

          const copyParams = {
            Bucket: BUCKET_NAME,
            CopySource: sourceName,
            Key: destName
          };

          await s3Bucket.copyObject(copyParams).promise();
          await s3Bucket.deleteObject(params).promise();
        });
    });

    return buildResponse(ACCEPTED, { message: 'Successfully parsed' });
  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    return buildResponse(INTERNAL_SERVER_ERROR, { message });
  }
};

export const main = middyfy(importFileParser);
