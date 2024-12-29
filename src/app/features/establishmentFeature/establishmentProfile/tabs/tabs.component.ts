import { Component, computed, signal } from '@angular/core';
import { Menu, MenuItem } from '../../models/profile/menu.model';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAuthService } from '../../../../core/services/auth/auth.service';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { take } from 'rxjs';

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
  addNewMenu = computed(() => (this.estServ.editMenu() ? true : false));

  constructor(
    private estServ: EstabilishmentService,
    private customAuth: CustomAuthService,
    private dialog: DialogService,
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
    const tabName = tab ? tab?.name : menuName;
    const translationKey = tab ? 'DELETE_MENU_ITEM' : 'DELETE_MENU_CATEGORY';
    this.dialog.showDialog(
      translationKey,
      'dialogRemoveItem-desc',
      'dialogRemoveItem-accept',
      'dialogRemoveItem-decline',
      { name: tabName },
    );

    const subscription = this.dialog.dialogResult$.subscribe((result) => {
      if (result !== null) {
        console.log('Dialog result:', result);
        if (result) {
          this.estServ.removeMenuItem(menuName, tab).subscribe();
          subscription.unsubscribe();
        } else {
          console.log('Item deletion cancelled');
          subscription.unsubscribe();
        }
      }
    });
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
