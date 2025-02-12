import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentFormEstInfoComponent } from './establishment-form-est-info.component';

describe('EstablishmentFormEstInfoComponent', () => {
  let component: EstablishmentFormEstInfoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstablishmentFormEstInfoComponent],
    }).compileComponents();

    component = TestBed.inject(EstablishmentFormEstInfoComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
