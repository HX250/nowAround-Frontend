import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-role-selection-page',
  templateUrl: './role-selection-page.component.html',
  styleUrls: ['./role-selection-page.component.css'],
})
export class RoleSelectionPageComponent {
  @Input() windowShown: boolean | undefined;
  @Output() updatedWindowShown = new EventEmitter<boolean>();
  @Output() closeWindowWhenClickOutside = new EventEmitter<boolean>();

  token: string = '';

  constructor(
    private cookieService: CookieService,
    private auth: AuthService,
    private router: Router,
  ) {}

  closeRoleSelection() {
    this.windowShown = !this.windowShown;
    this.updatedWindowShown.emit(this.windowShown);
  }
  closeModalWindow() {
    this.windowShown = !this.windowShown;
    this.updatedWindowShown.emit(this.windowShown);
  }

  guestAccountButton() {
    this.cookieService.set('role', 'guest');
    window.location.reload();
  }

  loginWithRedirect(): void {
    this.auth.loginWithPopup().subscribe({
      next: (Response) => {
        this.getToken();
      },
      error: (Error) => {
        console.log(Error);
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
        console.log(error);
      },
    });
  }
}
