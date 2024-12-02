import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map } from 'rxjs';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class CustomAuthService {
  private roleSubject = new BehaviorSubject<string>(this.getRoleVal() || '');
  roleState$ = this.roleSubject.asObservable();

  setRole(role: string): void {
    this.roleSubject.next(role);
    localStorage.setItem('role', role);
  }

  private getRoleVal() {
    return localStorage.getItem('role');
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService,
  ) {
    this.checkAuthOnInit();
  }

  getAccessToken() {
    return this.auth.getAccessTokenSilently({ detailedResponse: true });
  }

  checkAuthOnInit() {
    this.getAccessToken().subscribe({
      next: (response) => {
        this.handleTokenResponse(response.id_token);
      },
      error: (error) => {},
    });
  }

  loginWithRedirect(): void {
    this.auth.loginWithPopup().subscribe({
      next: (response) => {
        this.getToken();
      },
      error: (error) => {
        this.alert.showAlert('Login window has been closed', false);
      },
      complete: () => {},
    });
  }

  getToken(): void {
    this.getAccessToken().subscribe({
      next: (response) => {
        this.handleTokenResponse(response.id_token);
        this.handleRole(this.roleSubject.value);
      },
      error: (error) => {
        console.error('Token error:', error);
      },
    });
  }

  handleTokenResponse(idToken: string) {
    const decodedToken = this.getDecodedAccessToken(idToken);
    const apiRole =
      decodedToken['https://now-around-auth-api/roles']?.[0] || null;
    this.setRole(apiRole);
  }

  handleRole(role: string) {
    if (role === 'Admin') {
      this.router.navigateByUrl('/admin-page');
    } else if (role === 'Establishment') {
      this.router.navigateByUrl('/establishment');
    } else {
      this.router.navigateByUrl('home-page');
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return Error;
    }
  }

  resetRoleState(): void {
    this.roleSubject.next('');
    localStorage.removeItem('role');
  }
}
