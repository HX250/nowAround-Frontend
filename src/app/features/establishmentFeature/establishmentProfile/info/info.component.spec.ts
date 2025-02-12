import { TestBed } from '@angular/core/testing';

import { InfoComponent } from './info.component';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';

describe('InfoComponent', () => {
  let component: InfoComponent;
  let estServMock = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InfoComponent,
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(InfoComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
