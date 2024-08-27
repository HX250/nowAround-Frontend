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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
