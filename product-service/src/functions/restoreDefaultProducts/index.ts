import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'products-default',
        cors: true,
        documentation: {
          summary: "restoreDefaultProducts",
          description: "Restore default chemicals",
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: "Chemicals were successfully restored",
              },
              responseModels: {
                "application/json": "object",
                properties: {
                  message: 'string'
                }
              },
            },
            {
              statusCode: 500,
              responseBody: {
                description: "Server side error occured",
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
