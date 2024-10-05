import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabilishmentLoginComponent } from './estabilishment-login.component';

describe('EstabilishmentLoginComponent', () => {
  let component: EstabilishmentLoginComponent;
  let fixture: ComponentFixture<EstabilishmentLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstabilishmentLoginComponent]
    });
    fixture = TestBed.createComponent(EstabilishmentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
