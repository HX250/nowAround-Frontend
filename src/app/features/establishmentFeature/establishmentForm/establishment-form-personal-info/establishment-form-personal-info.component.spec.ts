import { TestBed } from '@angular/core/testing';

import { EstablishmentFormPersonalInfoComponent } from './establishment-form-personal-info.component';

describe('EstablishmentFormPersonalInfoComponent', () => {
  let component: EstablishmentFormPersonalInfoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstablishmentFormPersonalInfoComponent],
    }).compileComponents();

    component = TestBed.inject(EstablishmentFormPersonalInfoComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
