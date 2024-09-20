import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSelectionPageComponent } from './role-selection-page/role-selection-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RoleSelectionPageComponent],
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [RoleSelectionPageComponent],
})
export class UserFeatureModuleModule {}
