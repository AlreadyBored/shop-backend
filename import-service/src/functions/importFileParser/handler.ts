import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { BUCKET_NAME, REGION, STATUS_CODES, getInternalServerErrorMessage } from '../../utils/constants';
import AWS from 'aws-sdk';
import cvs from 'csv-parser';

const { ACCEPTED, INTERNAL_SERVER_ERROR } = STATUS_CODES

const importFileParser = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { Records } = event;

    Records.forEach(record => {
      const { key } = record.s3.object;

      const params = {
        Bucket: BUCKET_NAME,
        Key: key
      };

      const s3Bucket = new AWS.S3({ region: REGION });

      const s3Object = s3Bucket.getObject(params);

      const s3ReadableStream = s3Object.createReadStream();

      s3ReadableStream.pipe(cvs())
        .on('data', () => {

        })
        .on('error', () => {

        })
        .on('end', () => {

        });

    });

    return buildResponse(ACCEPTED, { message: 'Successfully parsed' });
  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    return buildResponse(INTERNAL_SERVER_ERROR, { message });
  }
}

export const main = middyfy(importFileParser);
