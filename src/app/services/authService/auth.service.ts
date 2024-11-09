import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular'; // assuming you're using Auth0
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class CustomAuthService {
  token: string = '';
  adminAuthorities: boolean = false;
  establishmentAuthorities: boolean = false;

  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.loadAuthority();
  }

  loginWithRedirect(): void {
    this.auth.loginWithPopup().subscribe({
      next: (response) => {
        this.getToken();
      },
      error: (error) => {
        console.error('Login error:', error);
      },
      complete: () => {
        this.router.navigateByUrl('home-page');
      },
    });
  }

  getToken(): void {
    this.auth.getAccessTokenSilently({ detailedResponse: true }).subscribe({
      next: (response) => {
        this.token = response.id_token;

        const decodedToken = this.getDecodedAccessToken(this.token);
        this.setRole(decodedToken);
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

  loadAuthority() {
    const authVal = this.cookieService.get('role');
    if (authVal === 'Admin') {
      this.adminAuthorities = true;
      this.router.navigateByUrl('/admin-page');
    } else if (authVal === 'Establishment') {
      this.establishmentAuthorities = true;
      this.router.navigateByUrl('/establishment-page');
    }
  }
}
