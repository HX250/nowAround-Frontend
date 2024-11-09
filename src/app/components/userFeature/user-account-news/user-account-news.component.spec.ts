import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountNewsComponent } from './user-account-news.component';

describe('UserAccountNewsComponent', () => {
  let component: UserAccountNewsComponent;
  let fixture: ComponentFixture<UserAccountNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountNewsComponent]
    });
    fixture = TestBed.createComponent(UserAccountNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
