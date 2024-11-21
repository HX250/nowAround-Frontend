import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomAuthService {
  token: string = '';
  adminAuthorities: boolean = false;
  establishmentAuthorities: boolean = false;

  private roleSubject = new BehaviorSubject<string>('');
  roleState$ = this.roleSubject.asObservable();

  constructor(
    private auth: AuthService,
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
      complete: () => {},
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
    const role = decodedToken[namespace]?.[0] || null;

    if (role) {
      this.roleSubject.next(role);
    }

    if (role === 'Admin') {
      this.adminAuthorities = true;
      this.router.navigateByUrl('/admin-page');
    } else if (role === 'Establishment') {
      this.establishmentAuthorities = true;
      this.router.navigateByUrl('/establishment-page');
    } else {
      this.router.navigateByUrl('home-page');
    }
  }

  loadAuthority() {
    this.roleState$.subscribe((role) => {
      if (!role) {
        return;
      }
      this.adminAuthorities = role === 'Admin';
      this.establishmentAuthorities = role === 'Establishment';
      console.log(role);

      if (role === 'Admin') {
        this.router.navigateByUrl('/admin-page');
      } else if (role === 'Establishment') {
        this.router.navigateByUrl('/establishment-page');
      } else {
        this.router.navigateByUrl('home-page');
      }
    });
  }

  resetRoleState(): void {
    this.roleSubject.next('');
    this.adminAuthorities = false;
    this.establishmentAuthorities = false;
  }
}
