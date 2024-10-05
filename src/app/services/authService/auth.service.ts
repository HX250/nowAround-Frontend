import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular'; // assuming you're using Auth0
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomAuthService {
  token: string = '';

  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  loginWithRedirect(): void {
    this.auth.loginWithRedirect().subscribe({
      next: (response) => {
        this.getToken();
      },
      error: (error) => {
        console.error('Login error:', error);
      },
    });
  }

  getToken(): void {
    this.auth.getAccessTokenSilently({ detailedResponse: true }).subscribe({
      next: (response) => {
        console.log(response.access_token);
        this.token = response.access_token;

        this.cookieService.set('tkn', this.token);
        this.cookieService.set('role', 'user');

        this.router.navigateByUrl('/homepage');
      },
      error: (error) => {
        console.error('Token error:', error);
      },
    });
  }
}
