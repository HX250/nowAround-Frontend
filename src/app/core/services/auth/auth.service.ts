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
  private readonly ROLE_KEY = 'userRole';
  private roleSubject = new BehaviorSubject<string>(this.getStoredRole() || '');
  roleState$ = this.roleSubject.asObservable();

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  setRole(role: string): void {
    this.roleSubject.next(role);
    localStorage.setItem(this.ROLE_KEY, role);
  }

  private getStoredRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
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
        this.setTokenRole(decodedToken);
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

  setTokenRole(decodedToken: any) {
    const namespace = 'https://now-around-auth-api/roles';
    const role = decodedToken[namespace]?.[0] || null;

    if (role) {
      this.setRole(role);
    }

    if (role === 'Admin') {
      this.router.navigateByUrl('/admin-page');
    } else if (role === 'Establishment') {
      this.router.navigateByUrl('/establishment-page');
    } else {
      this.router.navigateByUrl('home-page');
    }
  }

  resetRoleState(): void {
    this.roleSubject.next('');
    localStorage.removeItem(this.ROLE_KEY);
  }
}
