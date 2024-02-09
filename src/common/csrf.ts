import { doubleCsrf } from 'csrf-csrf';
import _ from 'lodash';

export const tokenHashCookieName = 'csrf-token-hash';
export const tokenCookieName = 'csrf-token';

export const {
  doubleCsrfProtection,
  generateToken,
  validateRequest,
} = doubleCsrf({
  cookieName: tokenHashCookieName,
  cookieOptions: {
    sameSite: 'strict',
    secure:
      _.isNil(process.env['INSECURE_COOKIE']) ||
      process.env['INSECURE_COOKIE'].length === 0 ||
      process.env['INSECURE_COOKIE'].toLowerCase() !== 'true',
  },
  getSecret: () => {
    return (process.env['CSRF_SECRET'] as string) ?? '';
  },
  size: 64,
});
