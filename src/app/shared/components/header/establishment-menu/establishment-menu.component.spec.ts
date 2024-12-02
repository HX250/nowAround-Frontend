import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentMenuComponent } from './establishment-menu.component';

describe('EstablishmentMenuComponent', () => {
  let component: EstablishmentMenuComponent;
  let fixture: ComponentFixture<EstablishmentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstablishmentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
