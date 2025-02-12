import { TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminService } from '../../../core/services/admin/admin.service';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let adminServiceMock = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminDashboardComponent,
        { provide: AdminService, useValue: adminServiceMock },
      ],
    }).compileComponents();

    component = TestBed.inject(AdminDashboardComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
