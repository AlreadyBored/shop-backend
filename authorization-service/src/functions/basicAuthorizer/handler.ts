import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { STATUS_CODES, getInternalServerErrorMessage } from '../../utils/constants';
import { logRequest } from '../../utils/consoleLogger';


const { OK, INTERNAL_SERVER_ERROR } = STATUS_CODES;

export const basicAuthorizer = async (event): Promise<APIGatewayProxyResult> => {
  try {
    logRequest(event);

    return buildResponse(OK, { message: 'ok' });
  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    return buildResponse(INTERNAL_SERVER_ERROR, { message });
  }
};

export const main = middyfy(basicAuthorizer);
