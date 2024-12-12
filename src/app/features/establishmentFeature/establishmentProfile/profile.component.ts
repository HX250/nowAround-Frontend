import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CustomAuthService } from '../../../core/services/auth/auth.service';
import { EstabilishmentService } from '../../../core/services/establishment/establishment.service';
import { profile } from '../models/profile/profile.model';
import { InfoComponent } from './info/info.component';
import { EstablishmentEditComponent } from '../establishmentEdit/establishment-edit.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    TranslateModule,
    InfoComponent,
    EstablishmentEditComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isWindowShown = signal(false);
  editWindow = signal(false);
  isLoggedIn: boolean = false;
  estProfile?: profile = undefined;
  tabLink?: boolean = false;
  establishmentID: string = '';

  constructor(
    public auth0: AuthService,
    private customAuth: CustomAuthService,
    private estServ: EstabilishmentService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getRole();

    this.establishmentID = this.route.snapshot.paramMap.get('id') || '';
    this.estServ.setTestProfile(this.establishmentID).subscribe();

    this.estServ.estProfileState$.subscribe((profile) => {
      this.estProfile = profile?.genericInformation ?? undefined;
    });
  }

  checkTab() {
    const targetCategories = ['Cafe', 'Restaurant', 'Bar'];
    this.tabLink = this.estProfile?.categories?.some((category) =>
      targetCategories.includes(category),
    );
  }
  openWindow() {
    this.isWindowShown.set(true);
  }
  closeWindow() {
    this.isWindowShown.set(false);
  }
  openEditWindow() {
    this.editWindow.set(true);
  }
  closeEditWindow() {
    this.editWindow.set(false);
  }

  getRole() {
    this.customAuth.roleState$.subscribe((role) => {
      if (role === 'Establishment') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
}
