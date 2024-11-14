import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentFormPersonalInfoComponent } from './establishment-form-personal-info.component';

describe('EstablishmentFormPersonalInfoComponent', () => {
  let component: EstablishmentFormPersonalInfoComponent;
  let fixture: ComponentFixture<EstablishmentFormPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentFormPersonalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablishmentFormPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
