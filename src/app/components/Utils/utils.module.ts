import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserFeatureModuleModule } from '../userFeature/user-feature-module.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomePageComponent, LandingPageComponent],
  imports: [
    CommonModule,
    TranslateModule,
    UserFeatureModuleModule,
    SharedModule,
  ],
  exports: [LandingPageComponent, HomePageComponent],
})
export class UtilsModule {}
