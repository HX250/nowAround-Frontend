import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentRegisterFormComponent } from './establishment-register-form.component';

describe('EstablishmentRegisterFormComponent', () => {
  let component: EstablishmentRegisterFormComponent;
  let fixture: ComponentFixture<EstablishmentRegisterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstablishmentRegisterFormComponent]
    });
    fixture = TestBed.createComponent(EstablishmentRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
