import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuComponent } from './user-menu.component';
import { ActivatedRoute } from '@angular/router';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserMenuComponent,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    component = TestBed.inject(UserMenuComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
