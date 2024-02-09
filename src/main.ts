import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import express from 'express';
import _ from 'lodash';

import { AppModule } from './app.module';
// import { CsrfMiddleware } from './common/middlewares/csrf.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
    },
  });

  app.use(cookieParser());

  app.use(express.json());

  // app.use(new CsrfMiddleware().use);

  await app.listen(process.env['PORT'] || 3000);
}

bootstrap();
