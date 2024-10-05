import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentRegisterPersonalInfoComponent } from './establishment-register-personal-info.component';

describe('EstablishmentRegisterPersonalInfoComponent', () => {
  let component: EstablishmentRegisterPersonalInfoComponent;
  let fixture: ComponentFixture<EstablishmentRegisterPersonalInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstablishmentRegisterPersonalInfoComponent]
    });
    fixture = TestBed.createComponent(EstablishmentRegisterPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
