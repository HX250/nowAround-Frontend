import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComponent } from './event.component';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';

describe('EventComponent', () => {
  let component: EventComponent;
  let estServMock = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventComponent,
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(EventComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
