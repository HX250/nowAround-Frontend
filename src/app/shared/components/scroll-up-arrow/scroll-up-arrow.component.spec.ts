import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollUpArrowComponent } from './scroll-up-arrow.component';

describe('ScrollUpArrowComponent', () => {
  let component: ScrollUpArrowComponent;
  let fixture: ComponentFixture<ScrollUpArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollUpArrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollUpArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
