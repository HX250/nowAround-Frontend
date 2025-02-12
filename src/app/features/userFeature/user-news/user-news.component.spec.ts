import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewsComponent } from './user-news.component';

describe('UserNewsComponent', () => {
  let component: UserNewsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserNewsComponent],
    }).compileComponents();

    component = TestBed.inject(UserNewsComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
