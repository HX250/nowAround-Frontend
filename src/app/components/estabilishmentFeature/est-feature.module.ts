import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstabilishmentLoginComponent } from './estabilishment-login/estabilishment-login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EstablishmentRegisterPersonalInfoComponent } from './establishment-register-personal-info/establishment-register-personal-info.component';
import { EstablishmentRegisterFormComponent } from './establishment-register-form/establishment-register-form.component';
import { EstablishmentRegisterComponent } from './establishment-register/establishment-register.component';
import { EstablishmentPopupComponent } from './establishment-popup/establishment-popup.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EstabilishmentLoginComponent,
    EstablishmentRegisterPersonalInfoComponent,
    EstablishmentRegisterFormComponent,
    EstablishmentRegisterComponent,
    EstablishmentPopupComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserModule,
    TranslateModule,
  ],
})
export class EstFeatureModule {}
