import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { CustomAuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private cookieService: CookieService,
    public authServ: CustomAuthService,
    private auth0: AuthService,
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

  logout(): void {
    this.auth0.logout({
      logoutParams: { returnTo: window.location.origin },
    });
    this.cookieService.deleteAll();
    this.authServ.adminAuthorities = false;
    this.authServ.establishmentAuthorities = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar') && this.isNavBarShown) {
      this.isNavBarShown = false;
    }
  }
}
