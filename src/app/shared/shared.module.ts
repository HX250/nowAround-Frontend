import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [FooterComponent, HeaderComponent, NotFoundPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    RouterModule,
  ],
  exports: [FooterComponent, HeaderComponent, NotFoundPageComponent],
})
export class SharedModule {}
