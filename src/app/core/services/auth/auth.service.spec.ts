import { TestBed } from '@angular/core/testing';
import { CustomAuthService } from './auth.service';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

const mockAuthService = {
  isAuthenticated$: of(true),
  user$: of({ name: 'Test User', email: 'test@example.com' }),
  loginWithRedirect: jest.fn(),
  logout: jest.fn(),
  getAccessTokenSilently: jest
    .fn()
    .mockReturnValue(of({ id_token: 'mock-token' })),
};

describe('AuthService', () => {
  let service: CustomAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomAuthService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
    service = TestBed.inject(CustomAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
