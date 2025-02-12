import { TestBed } from '@angular/core/testing';

import { RoleSelectionComponent } from './role-selection.component';
import { CustomAuthService } from '../../../core/services/auth/auth.service';
import { AuthService } from '@auth0/auth0-angular';

describe('RoleSelectionComponent', () => {
  let component: RoleSelectionComponent;
  let customAuthMock = {};
  let authServiceMock = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoleSelectionComponent,
        { provide: CustomAuthService, useValue: customAuthMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    component = TestBed.inject(RoleSelectionComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
