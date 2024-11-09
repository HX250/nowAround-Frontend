import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSelectionPageComponent } from './role-selection-page/role-selection-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserAccountAboutComponent } from './user-account-about/user-account-about.component';
import { UserAccountNewsComponent } from './user-account-news/user-account-news.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    RoleSelectionPageComponent,
    UserAccountComponent,
    UserAccountAboutComponent,
    UserAccountNewsComponent,
  ],
  imports: [CommonModule, TranslateModule, RouterModule, SharedModule],
  exports: [RoleSelectionPageComponent],
})
export class UserFeatureModuleModule {}
