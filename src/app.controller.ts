import type { Request } from 'express';

import { Controller, Get, Req } from '@nestjs/common';
import _ from 'lodash';

import { generateToken, tokenCookieName } from './common/csrf';

@Controller()
export class AppController {
  @Get('csrf')
  async csrf(@Req() req: Request) {
    let success = false;
    try {
      const csrfToken = generateToken(req, req.res, true);

      req.res?.cookie(tokenCookieName, csrfToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure:
          _.get(process.env, 'INSECURE_COOKIE', 'false').toLowerCase() !==
          'true',
      });

      success = true;
    } catch {
      success = false;
    }

    return {
      success,
    };
  }

  @Get()
  async index() {
    return {
      status: 'ok',
    };
  }
}
