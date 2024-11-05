import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { HttpLoaderFactory, SharedModule } from './shared/shared.module';
import { UtilsModule } from './components/Utils/utils.module';
import { UserFeatureModuleModule } from './components/userFeature/user-feature-module.module';
import { AuthModule } from '@auth0/auth0-angular';
import { EstFeatureModule } from './components/estabilishmentFeature/est-feature.module';
import { AdminFeatureModule } from './components/adminFeature/admin-feature.module';
import { MapFeatureModule } from './components/mapFeature/map-feature.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MapFeatureModule,
    EstFeatureModule,
    AdminFeatureModule,
    SharedModule,
    UtilsModule,
    UserFeatureModuleModule,
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    AuthModule.forRoot({
      domain: 'dev-1xh8kfmlma5zrj2z.us.auth0.com',
      clientId: 'TWbSxEXDyHxzzPXExKOyRvGUPGlsh2Px',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://now-around-auth-api/',
      },
    }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
