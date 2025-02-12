import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpComponent } from './pop-up.component';

describe('PopUpComponent', () => {
  let component: PopUpComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopUpComponent],
    }).compileComponents();

    component = TestBed.inject(PopUpComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
