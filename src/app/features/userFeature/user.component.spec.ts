import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

describe('UserComponent', () => {
  let component: UserComponent;
  const mockAuthService = {
    isAuthenticated$: of(true),
    user$: of({ name: 'Test User', email: 'test@example.com' }),
    loginWithRedirect: jest.fn(),
    logout: jest.fn(),
    getAccessTokenSilently: jest
      .fn()
      .mockReturnValue(of({ id_token: 'mock-token' })),
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        UserComponent,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    component = TestBed.inject(UserComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
