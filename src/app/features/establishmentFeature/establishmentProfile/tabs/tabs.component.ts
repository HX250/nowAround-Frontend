import { Component, computed } from '@angular/core';
import { Menu, MenuItem } from '../../models/profile/menu.model';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAuthService } from '../../../../core/services/auth/auth.service';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { ImageService } from '../../../../core/services/image/image.service';
import { MenuComponent } from '../../addEventPostMenu/menu/menu.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, TranslateModule, MenuComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  tabList?: Menu[] = [];
  isLoggedIn = computed(() => (this.customAuth.estLogin() ? true : false));
  isAddingNewMenu: boolean = false;
  menuImg: any;
  currentCategory: string | null = null;

  constructor(
    private estServ: EstabilishmentService,
    private customAuth: CustomAuthService,
    private dialog: DialogService,
    private imgService: ImageService,
  ) {}

  ngOnInit(): void {
    this.getProfileData();
    console.log(this.tabList);
  }

  getProfileData() {
    this.estServ
      .returnSpecificProfileInfo<Menu[]>('menus')
      .subscribe((Response) => {
        this.tabList = Response;
      });
  }

  addMenuItem(categoryName: string) {
    if (this.isAddingNewMenu && this.currentCategory === categoryName) {
      this.isAddingNewMenu = false;
      this.currentCategory = null;
    } else {
      this.isAddingNewMenu = true;
      this.currentCategory = categoryName;
    }
  }

  removeMenuCategory(menuCategory: Menu) {
    this.dialog.showDialog(
      'DELETE_MENU_CATEGORY',
      'dialogRemoveItem-desc',
      'dialogRemoveItem-accept',
      'dialogRemoveItem-decline',
      { name: menuCategory?.name },
    );

    const subscription = this.dialog.dialogResult$.subscribe((result) => {
      if (result !== null) {
        if (result) {
          this.estServ.removeMenuCategory(menuCategory.id).subscribe();
          subscription.unsubscribe();
        } else {
          console.log('Item deletion cancelled');
          subscription.unsubscribe();
        }
      }
    });
  }

  removeMenuItem(tab?: MenuItem) {
    this.dialog.showDialog(
      'DELETE_MENU_ITEM',
      'dialogRemoveItem-desc',
      'dialogRemoveItem-accept',
      'dialogRemoveItem-decline',
      { name: tab?.name },
    );

    const subscription = this.dialog.dialogResult$.subscribe((result) => {
      if (result !== null) {
        if (result) {
          this.estServ.removeMenuItem(tab!.id).subscribe();
          subscription.unsubscribe();
        } else {
          console.log('Item deletion cancelled');
          subscription.unsubscribe();
        }
      }
    });
  }

  uploadImg(event: any, menuId: string) {
    this.imgService.onFileChange(event, `/menu/item/image/${menuId}`);
  }

  getEstId() {
    this.estServ.estProfileState$.subscribe((Response) => {
      return Response?.auth0Id;
    });
  }
}
