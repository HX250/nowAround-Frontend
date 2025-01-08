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
      console.log('Dialog result:', result);
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

  uploadImg(event: any, where: string) {
    this.imgService.onFileChange(event, where);
  }

  getEstId() {
    this.estServ.estProfileState$.subscribe((Response) => {
      return Response?.auth0Id;
    });
  }
}
