import type { Request } from 'express';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import cookieParser from 'cookie-parser';
import { getMockReq, getMockRes } from 'vitest-mock-express';
import express from 'express';

import { AppController } from '../src/app.controller';

describe('App', () => {
  let controller: AppController;
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let request: Request;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.enableCors({ credentials: true });
    app.use(cookieParser());

    app.use(express.json());

    // app.use(new CsrfMiddleware().use);

    await app.init();

    controller = moduleFixture.get<AppController>(AppController);
  });

  beforeEach(async () => {
    request = getMockReq();
  });

  afterAll(async () => {
    await moduleFixture.close();
    await app.close();
  });

  describe('/', () => {
    it('should succeed', async () => {
      const response = await controller.index();
      expect(response).toStrictEqual({ status: 'ok' });
    });
  });

  describe('/csrf', () => {
    it('should succeed', async () => {
      const { res } = getMockRes();
      request.res = res;
      const response = await controller.csrf(request as Request);
      expect(response).toStrictEqual({ success: true });
    });

    it('should fail', async () => {
      const response = await controller.csrf(request as Request);
      expect(response).toStrictEqual({ success: false });
    });
  });
});
