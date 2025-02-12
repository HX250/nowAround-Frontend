import { TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';

describe('PostComponent', () => {
  let component: PostComponent;
  let estServMock = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostComponent,
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(PostComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
