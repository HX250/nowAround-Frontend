import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabilishmentRegisterComponent } from './estabilishment-register.component';

describe('EstabilishmentRegisterComponent', () => {
  let component: EstabilishmentRegisterComponent;
  let fixture: ComponentFixture<EstabilishmentRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstabilishmentRegisterComponent]
    });
    fixture = TestBed.createComponent(EstabilishmentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
