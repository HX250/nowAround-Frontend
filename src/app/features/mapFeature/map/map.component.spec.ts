import { TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { MapService } from '../../../core/services/map/map.service';

describe('MapComponent', () => {
  let component: MapComponent;
  const mockMapService = {
    getMap: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapComponent,
        { provide: MapService, useValue: mockMapService },
      ],
    }).compileComponents();

    component = TestBed.inject(MapComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
