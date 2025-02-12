import { TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let estServMock = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MenuComponent,
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(MenuComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
