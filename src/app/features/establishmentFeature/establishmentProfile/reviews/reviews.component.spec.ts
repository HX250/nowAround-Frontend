import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsComponent } from './reviews.component';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';

describe('ReviewsComponent', () => {
  let component: ReviewsComponent;
  let estServMock = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReviewsComponent,
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(ReviewsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
