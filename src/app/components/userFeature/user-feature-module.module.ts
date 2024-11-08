import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSelectionPageComponent } from './role-selection-page/role-selection-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserAccountAboutComponent } from './user-account-about/user-account-about.component';

@NgModule({
  declarations: [RoleSelectionPageComponent, UserAccountComponent, UserAccountAboutComponent],
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [RoleSelectionPageComponent],
})
export class UserFeatureModuleModule {}
