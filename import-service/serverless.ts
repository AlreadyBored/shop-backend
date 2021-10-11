import type { AWS } from '@serverless/typescript';
import { importProductsFile, importFileParser } from './src/functions';
import { BUCKET_NAME } from './src/utils/constants';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  useDotenv: true,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SQS_URL: {
        Ref: 'SQSQueue'
      }
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: `arn:aws:s3:::${BUCKET_NAME}`,
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: `arn:aws:s3:::${BUCKET_NAME}/*`,
      },
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: {
          'Fn::GetAtt': ['SQSQueue', 'Arn']
        }
      }
    ],
  },
  resources: {
    Outputs: {
      SQSArn: {
        Value: {
          'Fn::GetAtt': ['SQSQueue', 'Arn']
        },
        Export: {
          Name: 'SQSArn'
        }
      }
    },
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalog-items-sqs-queue'
        }
      }
    }
  },
  // import the function via paths
  functions: { importProductsFile, importFileParser },

};

module.exports = serverlessConfiguration;
