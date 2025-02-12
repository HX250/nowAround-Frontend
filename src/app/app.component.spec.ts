import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComponent],
    }).compileComponents();

    component = TestBed.inject(AppComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
