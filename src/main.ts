import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('AppBootstrap')
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1')
  const PORT = process.env.PORT || 4400

  await app.listen(PORT);
  logger.log(`Test-app-api server listening on port [${PORT}] in [${process.env.STATE}]`);
}
bootstrap();
