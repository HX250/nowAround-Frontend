import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuComponent } from './admin-menu.component';
import { ActivatedRoute } from '@angular/router';

describe('AdminMenuComponent', () => {
  let component: AdminMenuComponent;

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
        AdminMenuComponent,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    component = TestBed.inject(AdminMenuComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
