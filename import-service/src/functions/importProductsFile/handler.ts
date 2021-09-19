import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { BUCKET_NAME, SIGNED_URL_EXPIRATION, UPLOAD_PREFIX, REGION, STATUS_CODES, getInternalServerErrorMessage } from '../../utils/constants';
import AWS from 'aws-sdk';

const { OK, INTERNAL_SERVER_ERROR } = STATUS_CODES

const importProductsFile = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const { name } = event.queryStringParameters;

    const prefix = `${UPLOAD_PREFIX}/${name}`;

    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix,
      Expires: SIGNED_URL_EXPIRATION,
      ContentType: 'text/csv'
    };

    const s3Bucket = new AWS.S3({ region: REGION });

    const signedURL = await s3Bucket.getSignedUrlPromise('putObject', params);

    return buildResponse(OK, { signedURL });
  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    return buildResponse(INTERNAL_SERVER_ERROR, { message });
  }
}

export const main = middyfy(importProductsFile);
