import { TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { of } from 'rxjs';

setupZoneTestEnv();

const mockAuthService = {
  isAuthenticated$: of(true),
  user$: of({ name: 'Test User', email: 'test@example.com' }),
  loginWithRedirect: jest.fn(),
  logout: jest.fn(),
  getAccessTokenSilently: jest
    .fn()
    .mockReturnValue(of({ id_token: 'mock-token' })),
};
beforeAll(() => {
  TestBed.configureTestingModule({
    imports: [TranslateModule.forRoot()],
    providers: [{ provide: AuthService, useValue: mockAuthService }],
  });
});
