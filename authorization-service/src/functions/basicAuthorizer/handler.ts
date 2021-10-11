import 'source-map-support/register';
import { buildResponse } from '@libs/apiGateway';
import { APIGatewayProxyResult } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { STATUS_CODES, getInternalServerErrorMessage } from '../../utils/constants';
import { generatePolicy } from '../../utils/generatePolicy';
import { logRequest } from '../../utils/consoleLogger';


const { OK, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = STATUS_CODES;

export const basicAuthorizer = async (event): Promise<APIGatewayProxyResult> => {
  try {
    logRequest(event);

    if (event['type'] !== 'TOKEN') {
      return buildResponse(UNAUTHORIZED, {
        message: 'Unauthorized'
      });
    }

    const authorizationToken = event.authorizationToken;

    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const [username, password] = plainCreds;

    console.log(`username: ${username}`, `password: ${password}`);

    const storedUserPassword = process.env[username];
    const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    return buildResponse(OK, { policy });
  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    return buildResponse(INTERNAL_SERVER_ERROR, { message });
  }
};


export const main = middyfy(basicAuthorizer);
