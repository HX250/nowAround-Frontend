import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CustomAuthService } from '../../../core/services/auth/auth.service';
import { EstabilishmentService } from '../../../core/services/establishment/establishment.service';
import { profile } from '../models/profile/profile.model';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  estProfile?: profile = undefined;
  tabLink?: boolean = false;

  constructor(
    public auth0: AuthService,
    private customAuth: CustomAuthService,
    private estServ: EstabilishmentService,
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.estServ.setTestProfile();

    this.estServ.estProfileState$.subscribe((profile) => {
      this.estProfile = profile?.genericInformation ?? undefined;
      this.checkTab();
      console.log(this.estProfile);
    });
  }
  checkTab() {
    const targetCategories = ['Cafe', 'Restaurant', 'Bar'];
    this.tabLink = this.estProfile?.categories?.some((category) =>
      targetCategories.includes(category),
    );
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
