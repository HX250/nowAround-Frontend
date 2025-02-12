import { TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { EstabilishmentService } from '../../../core/services/establishment/establishment.service';
import { of } from 'rxjs';
import { CustomAuthService } from '../../../core/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

const mockCustomAuth = {
  getAccessToken: jest.fn().mockReturnValue(of({ id_token: 'mock-id-token' })),
};

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jest.fn().mockReturnValue('mock-id'),
    },
    data: {
      someData: 'mock-data',
    },
  },
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let estServMock = {};

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        ProfileComponent,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CustomAuthService, useValue: mockCustomAuth },
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(ProfileComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
