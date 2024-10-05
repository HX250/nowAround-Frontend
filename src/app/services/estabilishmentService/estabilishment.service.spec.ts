import { TestBed } from '@angular/core/testing';

import { EstabilishmentService } from './estabilishment.service';

describe('EstabilishmentService', () => {
  let service: EstabilishmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstabilishmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
