import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { MapService } from '../../../core/services/map/map.service';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let mapMockService = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FilterComponent,
        { provide: MapService, useValue: mapMockService },
      ],
    }).compileComponents();

    component = TestBed.inject(FilterComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
