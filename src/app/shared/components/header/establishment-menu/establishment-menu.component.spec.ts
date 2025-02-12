import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentMenuComponent } from './establishment-menu.component';
import { ActivatedRoute } from '@angular/router';

describe('EstablishmentMenuComponent', () => {
  let component: EstablishmentMenuComponent;
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
        EstablishmentMenuComponent,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    component = TestBed.inject(EstablishmentMenuComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
