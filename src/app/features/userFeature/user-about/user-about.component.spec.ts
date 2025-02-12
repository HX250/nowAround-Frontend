import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAboutComponent } from './user-about.component';

describe('UserAboutComponent', () => {
  let component: UserAboutComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAboutComponent],
    }).compileComponents();

    component = TestBed.inject(UserAboutComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
