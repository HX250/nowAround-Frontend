import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminComponent],
    }).compileComponents();

    component = TestBed.inject(AdminComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
