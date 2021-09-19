import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        cors: true,
        documentation: {
          summary: "addProduct",
          description: "Add single chemical",
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description:
                  "Single chemical",
              },
              responseModels: {
                "application/json": "Chemical",
              },
            },
            {
              statusCode: 400,
              responseBody: {
                description: "Request body is invalid",
              },
              responseModels: {
                'application/json': 'object',
                properties: {
                  message: 'string'
                }
              },
            },
            {
              statusCode: 500,
              responseBody: {
                description:
                  "Server side error occured",
              },
              responseModels: {
                'application/json': 'object',
                properties: {
                  message: 'string'
                }
              },
            },
          ],
        },
      }
    }
  ]
}
