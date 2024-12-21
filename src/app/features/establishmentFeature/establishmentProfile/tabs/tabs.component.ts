import { Component, computed, signal } from '@angular/core';
import { Menu, MenuItem } from '../../models/profile/menu.model';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAuthService } from '../../../../core/services/auth/auth.service';
import { EditMenuComponent } from './edit-menu/edit-menu.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, TranslateModule, EditMenuComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  tabList?: Menu[] = [];
  isLoggedIn = computed(() => (this.customAuth.estLogin() ? true : false));
  addNewMenu = signal(false);

  constructor(
    private estServ: EstabilishmentService,
    private customAuth: CustomAuthService,
  ) {}

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.estServ
      .returnSpecificProfileInfo<Menu[]>('menus')
      .subscribe((Response) => {
        this.tabList = Response;
      });
  }
  removeMenuItem(menuName: string, tab?: MenuItem) {
    if (confirm('Really delete item?')) {
      this.estServ.removeMenuItem(menuName, tab).subscribe();
    }
  }
  getEstId() {
    this.estServ.estProfileState$.subscribe((Response) => {
      return Response?.auth0Id;
    });
  }
  addMenuCategory() {
    this.estServ.editMenu.set(true);
  }
}
