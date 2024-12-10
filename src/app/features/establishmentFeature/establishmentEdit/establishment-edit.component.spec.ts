import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentEditComponent } from './establishment-edit.component';

describe('EstablishmentEditComponent', () => {
  let component: EstablishmentEditComponent;
  let fixture: ComponentFixture<EstablishmentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablishmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
