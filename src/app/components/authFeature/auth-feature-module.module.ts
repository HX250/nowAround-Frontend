import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [CommonModule, TranslateModule, RouterModule],
})
export class AuthFeatureModuleModule {}
