import { TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DialogComponent', () => {
  let component: DialogComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [DialogComponent],
    }).compileComponents();

    component = TestBed.inject(DialogComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
