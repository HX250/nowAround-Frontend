import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountAboutComponent } from './user-account-about.component';

describe('UserAccountAboutComponent', () => {
  let component: UserAccountAboutComponent;
  let fixture: ComponentFixture<UserAccountAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAccountAboutComponent]
    });
    fixture = TestBed.createComponent(UserAccountAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
