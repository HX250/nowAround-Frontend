import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentRegisterComponent } from './establishment-register.component';

describe('EstablishmentRegisterComponent', () => {
  let component: EstablishmentRegisterComponent;
  let fixture: ComponentFixture<EstablishmentRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstablishmentRegisterComponent]
    });
    fixture = TestBed.createComponent(EstablishmentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
