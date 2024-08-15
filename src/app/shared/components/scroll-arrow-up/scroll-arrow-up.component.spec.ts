import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollArrowUpComponent } from './scroll-arrow-up.component';

describe('ScrollArrowUpComponent', () => {
  let component: ScrollArrowUpComponent;
  let fixture: ComponentFixture<ScrollArrowUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollArrowUpComponent]
    });
    fixture = TestBed.createComponent(ScrollArrowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
