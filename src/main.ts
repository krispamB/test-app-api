import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyparser from 'body-parser';

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

  //test fix
  app.use(bodyparser.json({ limit: '50mb' }));
  app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));

  app.setGlobalPrefix('api/v1');
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  logger.log(
    `Test-app-api server listening on port [${PORT}] in [${process.env.STATE}]`,
  );
}
bootstrap();
