import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
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
import { AddComponent } from '../addEventPostMenu/add.component';
import { ImageService } from '../../../core/services/image/image.service';

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
    AddComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isWindowShown = signal(false);
  editWindow = signal(false);
  addWindow = signal(false);
  isLoggedIn = computed(() => (this.customAuth.estLogin() ? true : false));
  estProfile?: profile = undefined;
  tabLink?: boolean = false;
  eventLink: boolean = false;
  establishmentID: string = '';
  backgroundPreviewImage: any;
  profilePreviewImage: any;

  constructor(
    public auth0: AuthService,
    private customAuth: CustomAuthService,
    private estServ: EstabilishmentService,
    private route: ActivatedRoute,
    private imgService: ImageService,
  ) {}

  ngOnInit(): void {
    this.saveProfile();
    this.checkTab();
    this.getProfileData();
  }

  saveProfile() {
    this.establishmentID = this.route.snapshot.paramMap.get('id') || '';
    this.estServ.setTestProfile(this.establishmentID).subscribe();
  }

  checkTab(): void {
    this.estServ.returnSpecificProfileInfo<boolean>('menus').subscribe({
      next: (response) => {
        this.tabLink = response !== undefined && response;
      },
    });
    this.estServ.returnSpecificProfileInfo<boolean>('events').subscribe({
      next: (response) => {
        this.eventLink = response !== undefined && response;
      },
    });
  }

  getProfileData() {
    this.estServ
      .returnSpecificProfileInfo<profile>('genericInfo')
      .subscribe((Response) => {
        this.estProfile = Response;
      });
  }

  onFileChange(event: any, where: string) {
    this.imgService.onFileChange(event, where);
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
  openAddWindow() {
    this.addWindow.set(true);
  }
  closeAddWindow() {
    this.addWindow.set(false);
  }
}
