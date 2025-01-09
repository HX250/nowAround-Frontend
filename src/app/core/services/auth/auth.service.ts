import { Injectable, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomAuthService {
  private roleSubject = new BehaviorSubject<string>(this.getRoleVal() || '');
  roleState$ = this.roleSubject.asObservable();
  estLogin = signal(false);

  setRole(role: string): void {
    this.roleSubject.next(role);
    localStorage.setItem('role', role);

    if (role === 'Establishment') {
      this.estLogin.set(true);
    }
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
        this.alert.showAlert(
          'Login window has been closed, please try again!',
          false,
        );
      },
      complete: () => {},
    });
  }

  getToken(): void {
    this.getAccessToken().subscribe({
      next: (response) => {
        this.handleTokenResponse(response.access_token);
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
      let estId = undefined;
      this.auth.user$.subscribe((response) => {
        estId = response?.sub;
        console.log(estId);
        this.router.navigateByUrl('/');
        this.router.navigateByUrl(`/establishment/${estId}`);
      });
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
    this.estLogin.set(false);
    localStorage.removeItem('role');
  }
}
