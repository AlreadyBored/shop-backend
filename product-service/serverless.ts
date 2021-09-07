import type { AWS } from '@serverless/typescript';
import dotenv from 'dotenv';
import { getProductsList, getProductById, addProduct } from './src/functions';
import { ChemicalSchema, ChemicalsSchema } from './src/schemas';

dotenv.config({
  path: __dirname + './env'
});

const serverlessConfiguration: AWS = {
  service: 'product-service-be',
  useDotenv: true,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    documentation: {
      version: '1.0.0',
      title: 'Shop-BE',
      description: 'Chemicals store API',
      models: [
        {
          name: 'Chemical',
          description: 'Schema of single chemical',
          contentType: 'application/json',
          schema: ChemicalSchema
        },
        {
          name: 'Chemicals',
          description: 'Schema of multiple chemicals',
          contentType: 'application/json',
          schema: ChemicalsSchema
        },
      ]
    }
  },
  plugins: ['serverless-webpack', 'serverless-openapi-documentation'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: '${env:PG_HOST}',
      PG_PORT: '${env:PG_PORT}',
      PG_DATABASE: '${env:PG_DATABASE}',
      PG_USERNAME: '${env:PG_USERNAME}',
      PG_PASSWORD: '${env:PG_PASSWORD}'
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { getProductsList, getProductById, addProduct },
};

module.exports = serverlessConfiguration;
