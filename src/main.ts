import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: ['http://127.0.0.1:5500'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
