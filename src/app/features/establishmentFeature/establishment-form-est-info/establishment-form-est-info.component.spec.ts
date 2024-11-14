import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentFormEstInfoComponent } from './establishment-form-est-info.component';

describe('EstablishmentFormEstInfoComponent', () => {
  let component: EstablishmentFormEstInfoComponent;
  let fixture: ComponentFixture<EstablishmentFormEstInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentFormEstInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablishmentFormEstInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
