import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  languageSet: string = '0';

  ngOnInit(): void {
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
      this.languageSet = storedLang;
    } else {
      localStorage.setItem('lang', this.languageSet);
    }
  }

  changeLang(value: string) {
    localStorage.setItem('lang', value);
    this.languageSet = value;
  }
}
