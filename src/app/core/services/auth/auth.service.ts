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
  private roleSubject = new BehaviorSubject<string>('');
  roleState$ = this.roleSubject.asObservable();
  estLogin = signal(false);

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertService,
  ) {
    this.checkAuthOnInit();
  }

  private getRoleFromToken(token: string): string {
    const decodedToken = this.getDecodedAccessToken(token);
    const role = decodedToken['https://now-around-auth-api/roles']?.[0] || '';

    if (role === 'Admin') {
      this.router.navigateByUrl('/admin-page');
    } else if (role === 'Establishment') {
      this.navigateToEstablishment();
    }
    return role;
  }
  navigateToEstablishment() {
    this.router.navigateByUrl(`/establishment/${this.getAccessToken()}`);
  }

  setRole(role: string): void {
    this.roleSubject.next(role);

    if (role === 'Establishment') {
      this.estLogin.set(true);
    }
  }

  checkAuthOnInit() {
    this.getAccessToken().subscribe({
      next: (response) => {
        const role = this.getRoleFromToken(response.id_token);
        this.setRole(role);
      },
    });
  }

  getAccessToken() {
    return this.auth.getAccessTokenSilently({ detailedResponse: true });
  }

  loginWithRedirect(): void {
    this.auth.loginWithPopup().subscribe({
      next: () => this.getToken(),
      error: () => {
        this.alert.showAlert('authServError-Login', false);
      },
    });
  }

  getToken(): void {
    this.getAccessToken().subscribe({
      next: (response) => {
        const role = this.getRoleFromToken(response.access_token);
        this.setRole(role);
        this.handleRole(role);
      },
      error: (error) => {},
    });
  }

  handleRole(role: string) {
    if (role === 'Admin') {
      this.router.navigateByUrl('/admin-page');
    } else if (role === 'Establishment') {
      this.auth.user$.subscribe((response) => {
        const estId = response?.sub;
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
      return {};
    }
  }

  resetRoleState(): void {
    this.roleSubject.next('');
    this.estLogin.set(false);
  }
}
