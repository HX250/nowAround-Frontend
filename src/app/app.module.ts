import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpLoaderFactory, SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

import { UtilsModule } from './components/Utils/utils.module';
import { AuthFeatureModuleModule } from './components/authFeature/auth-feature-module.module';
import { UserFeatureModuleModule } from './components/userFeature/user-feature-module.module';
import { CookieService } from 'ngx-cookie-service';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthFeatureModuleModule,
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
      },
    }),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
