import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let estServMock = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventsComponent,
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(EventsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
