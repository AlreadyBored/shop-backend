# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Task 5 Import to S3

1. Task description https://github.com/EPAM-JS-Competency-center/cloud-development-course-initial/blob/main/task5-import-to-s3/task.md
2. Submit/deadline are 22.09.2021/22.09.2021

## Evaluation criteria
 
- **1** - File **serverless.yml** contains configuration for **importProductsFile** function (look at `serverless.ts` at root folder) [V]
- **3** - The **importProductsFile** lambda function returns a correct response which can be used to upload a file into the **S3** bucket (`importProductsFile` invoke url is `https://hifx2vr6f4.execute-api.eu-west-1.amazonaws.com/dev/import?name=<FILENAME>`, can be tested using POSTMAN or SWAGGER)[V]
- **4** - Frontend application is integrated with **importProductsFile** lambda [V]
- **5** - The **importFileParser** lambda function is implemented and **serverless.yml** contains configuration for the lambda (look at `serverless.ts` at root folder) [V]
Logs from `importFileParser`:
![CloudWatch_logs](https://user-images.githubusercontent.com/34455330/134261143-62f6045d-909f-4e74-a79c-ce8667a25393.JPG)
- **6** - **async/await** is used in lambda functions [V]
- **7** - **importProductsFile** lambda is covered by **unit** tests (look at `src/functions/importProductsFile/__tests__`) [V]
- **8** - At the end of the **stream** the lambda function should move the file from the **uploaded** folder into the **parsed** folder (move the file means that file should be copied into **parsed** folder, and then deleted from **uploaded** folder) (look at code of `importFileParser`, it works) [V]

---

Links:
1. `importProductsFile` lambda `https://hifx2vr6f4.execute-api.eu-west-1.amazonaws.com/dev/import?name=<FILENAME>`
2. SWAGGER https://app.swaggerhub.com/apis/AlreadyBored/import-service/1.0.0
3. Frontend https://dajtpag5srf3l.cloudfront.net/admin/products
4. Frontend PR https://github.com/AlreadyBored/shop-vue-vuex-cloudfront/pull/4

### Total score is 8/8
