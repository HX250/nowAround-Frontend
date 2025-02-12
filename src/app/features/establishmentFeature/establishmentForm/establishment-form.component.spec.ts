import { TestBed } from '@angular/core/testing';
import { EstablishmentFormComponent } from './establishment-form.component';
import { EstabilishmentService } from '../../../core/services/establishment/establishment.service';

describe('EstablishmentFormComponent', () => {
  let component: EstablishmentFormComponent;
  let estServMock = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EstablishmentFormComponent,
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(EstablishmentFormComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
