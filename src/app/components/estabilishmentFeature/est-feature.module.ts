import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstabilishmentRegisterComponent } from './estabilishment-register/estabilishment-register.component';
import { EstabilishmentLoginComponent } from './estabilishment-login/estabilishment-login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EstablishmentRegisterPersonalInfoComponent } from './establishment-register-personal-info/establishment-register-personal-info.component';

@NgModule({
  declarations: [EstabilishmentRegisterComponent, EstabilishmentLoginComponent, EstablishmentRegisterPersonalInfoComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, BrowserModule],
})
export class EstFeatureModule {}
