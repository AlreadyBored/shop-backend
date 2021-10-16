import 'source-map-support/register';
import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerCallback } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { getInternalServerErrorMessage } from '../../utils/constants';
import { generatePolicy } from '../../utils/generatePolicy';
import { logRequest } from '../../utils/consoleLogger';

export const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent, _ctx, cb: APIGatewayAuthorizerCallback) => {
  try {
    logRequest(event);

    if (event.type !== 'TOKEN') {
      cb('Unauthorized');
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

    cb(null, policy);
  } catch (e) {
    const message = getInternalServerErrorMessage(e);
    console.log('[ERROR OCCURED]', message);
    cb('Unauthorized');
  }
};


export const main = middyfy(basicAuthorizer);
