import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentPopupComponent } from './establishment-popup.component';

describe('EstablishmentPopupComponent', () => {
  let component: EstablishmentPopupComponent;
  let fixture: ComponentFixture<EstablishmentPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstablishmentPopupComponent]
    });
    fixture = TestBed.createComponent(EstablishmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
