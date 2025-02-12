import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentEditComponent } from './establishment-edit.component';

describe('EstablishmentEditComponent', () => {
  let component: EstablishmentEditComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstablishmentEditComponent],
    }).compileComponents();

    component = TestBed.inject(EstablishmentEditComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
