import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  Router,
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
import { Menu } from '../models/profile/menu.model';
import { Events } from '../models/profile/events.model';

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
  tabLink: boolean = false;
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
    private router: Router,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.saveProfile();
    }, 3000);
    this.checkTab();
    this.getProfileData();
  }

  saveProfile() {
    const handleLoggedIn = () => {
      this.auth0.user$.subscribe((response) => {
        const establishmentID = response?.sub || '';
        this.router.navigateByUrl(`establishment/${establishmentID}`);
        this.estServ.setTestProfile(establishmentID).subscribe();
      });
    };

    const handleNotLoggedIn = () => {
      const establishmentID = this.route.snapshot.paramMap.get('id') || '';
      this.estServ.setTestProfile(establishmentID).subscribe();
    };

    this.isLoggedIn() ? handleLoggedIn() : handleNotLoggedIn();
  }

  checkTab(): void {
    this.estServ.returnSpecificProfileInfo<Menu>('menus').subscribe({
      next: (response) => {
        this.tabLink = response ? true : false;
      },
    });
    this.estServ.returnSpecificProfileInfo<Events>('events').subscribe({
      next: (response) => {
        this.eventLink = response ? true : false;
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

  addAccordingPhoto(where: string) {
    return this.imgService.addAccordingPhoto(where);
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
