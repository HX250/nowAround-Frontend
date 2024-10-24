import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular'; // assuming you're using Auth0
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import jwt_decode, { jwtDecode } from 'jwt-decode';
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
    this.auth.loginWithPopup().subscribe({
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
        this.token = response.id_token;

        const decodedToken = this.getDecodedAccessToken(this.token);
        this.setRole(decodedToken);

        this.router.navigateByUrl('/homepage');
      },
      error: (error) => {
        console.error('Token error:', error);
      },
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return Error;
    }
  }

  setRole(decodedToken: any) {
    const namespace = 'https://now-around-auth-api/roles';
    const role = decodedToken[namespace][0];
    this.cookieService.set('role', role);
  }
}
