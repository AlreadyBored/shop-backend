import { importProductsFile } from '../handler';
import AWS from 'aws-sdk-mock';
import testEvent from './test.json';
import { CORS_HEADERS, STATUS_CODES, getInternalServerErrorMessage } from '../../../utils/constants';
const { OK, INTERNAL_SERVER_ERROR } = STATUS_CODES;

const TEST_SIGNED_URL = 'some test value';

describe('Import service importProductsFile', () => {

  beforeAll(async () => {
    AWS.mock('S3', 'getSignedUrl', TEST_SIGNED_URL);
  });

  it('should return correct status code', async () => {
    const { statusCode } = await importProductsFile(testEvent);
    expect(statusCode).toBe(OK);
  });

  it('should return correct headers', async () => {
    const { headers } = await importProductsFile(testEvent);
    expect(headers).toStrictEqual(CORS_HEADERS);
  });

  it('should return correct signedUrl in case of correct event', async () => {
    const { body } = await importProductsFile(testEvent);
    expect(body).toBeTruthy();
    expect(JSON.parse(body).signedURL).toBe(TEST_SIGNED_URL);
  });

  it('should return correct correct status code and message in case of error', async () => {
    AWS.restore();

    const ERROR_MESSAGE = 'Something went wrong';

    AWS.mock('S3', 'getSignedUrl', () => {
      throw new Error(ERROR_MESSAGE);
    });

    const { statusCode, body } = await importProductsFile(testEvent);

    expect(statusCode).toBe(INTERNAL_SERVER_ERROR);

    expect(JSON.parse(body)).toStrictEqual({
      message: getInternalServerErrorMessage(new Error(ERROR_MESSAGE))
    })
  });

})