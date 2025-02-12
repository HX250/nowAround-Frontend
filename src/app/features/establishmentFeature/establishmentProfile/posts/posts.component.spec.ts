import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let estServMock = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsComponent,
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(PostsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
