import { TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { CustomAuthService } from '../../../../core/services/auth/auth.service';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let estServMock = {};
  let customAuthService: CustomAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TabsComponent,
        CustomAuthService,
        { provide: EstabilishmentService, useValue: estServMock },
      ],
    }).compileComponents();

    component = TestBed.inject(TabsComponent);
    customAuthService = TestBed.inject(CustomAuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
