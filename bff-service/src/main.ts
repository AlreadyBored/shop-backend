import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

process.on('uncaughtException', (e) => {
  console.log(`Uncaught exception: ${e}`);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  console.log(`Unhandled rejection: ${e}`);
  process.exit(1);
});

dotenv.config();

const PORT = process.env['PORT'] ? process.env['PORT'] : 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
