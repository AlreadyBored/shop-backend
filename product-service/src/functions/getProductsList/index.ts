import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
        documentation: {
          summary: "getProductsList",
          description: "Get all chemicals",
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: "All chemicals",
              },
              responseModels: {
                "application/json": "Chemicals",
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
