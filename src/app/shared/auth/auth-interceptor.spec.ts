import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
  it('should create an instance', () => {
    expect(new AuthInterceptor(null)).toBeTruthy();
  });
});
