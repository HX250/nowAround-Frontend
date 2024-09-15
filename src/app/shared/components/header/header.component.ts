import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private cookieService: CookieService,
  ) {
    this.translate.addLangs(['en', 'sk']);
    this.translate.setDefaultLang('en');
  }
  languageSet: string = '0';
  isNavBarShown: boolean = false;

  ngOnInit(): void {
    const storedLang = this.cookieService.get('lang');
    if (storedLang) {
      this.languageSet = storedLang;
      this.setLanguage(this.languageSet);
    } else {
      this.cookieService.set('lang', this.languageSet);
      this.setLanguage(this.languageSet);
    }
  }

  changeLang(value: string) {
    this.cookieService.set('lang', value);
    this.languageSet = value;
    this.setLanguage(value);
  }

  setLanguage(language: string) {
    const lang = language === '0' ? 'en' : 'sk';
    this.translate.use(lang);
  }

  showNavBar() {
    this.isNavBarShown = !this.isNavBarShown;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar') && this.isNavBarShown) {
      this.isNavBarShown = false;
    }
  }
}
