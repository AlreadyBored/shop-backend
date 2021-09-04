import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{productId}',
        cors: true,
        request: {
          parameters: {
            paths: {
              productId: true
            }
          }
        },
        documentation: {
          summary: "getProductsById",
          description: "Get single chemical by id",
          pathParams: [
            {
              name: "productId",
              description: "Chemical id",
              schema: {
                type: "string",
                format: "uuid"
              },
            },
          ],
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
                description: "Chemical id is not provided",
              },
              responseModels: {
                'application/json': 'object',
                properties: {
                  message: 'string'
                }
              },
            },
            {
              statusCode: 404,
              responseBody: {
                description: "Chemical with provided id is not found",
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
