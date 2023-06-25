import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('AppBootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  logger.log(
    `Test-app-api server listening on port [${PORT}] in [${process.env.STATE}]`,
  );
}
bootstrap();
