import { TestBed } from '@angular/core/testing';

import { LandingFeatureComponent } from './landing-feature.component';
import { CustomAuthService } from '../../core/services/auth/auth.service';

describe('LandingFeatureComponent', () => {
  let component: LandingFeatureComponent;
  let customAuthMockService = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LandingFeatureComponent,
        { provide: CustomAuthService, useValue: customAuthMockService },
      ],
    }).compileComponents();

    component = TestBed.inject(LandingFeatureComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
