import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent {
  token: string = '';

  constructor(
    public auth: AuthService,
    private cookieService: CookieService,
  ) {}
  logAuth() {
    this.auth.isAuthenticated$.subscribe({
      next: (Resposne) => {
        console.log(Resposne);
      },
      error: (Error) => {
        console.log(Error);
      },
    });
  }

  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
    this.cookieService.deleteAll();
  }

  getToken(): void {
    this.auth.getAccessTokenSilently({ detailedResponse: true }).subscribe({
      next: (response) => {
        console.log(response.access_token);
        this.token = response.access_token;

        this.cookieService.set('tkn', this.token);
        this.cookieService.set('role', 'user');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
