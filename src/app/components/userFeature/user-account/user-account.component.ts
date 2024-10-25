import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';
import { CustomAuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent {
  token: string = '';

  constructor(
    public auth0: AuthService,
    private authServ: CustomAuthService,
    private cookieService: CookieService,
  ) {}
  logAuth() {
    this.auth0.isAuthenticated$.subscribe({
      next: (Resposne) => {
        console.log(Resposne);
      },
      error: (Error) => {
        console.log(Error);
      },
    });
  }

  getToken(): void {
    this.auth0.getAccessTokenSilently({ detailedResponse: true }).subscribe({
      next: (response) => {
        console.log(response.access_token);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
