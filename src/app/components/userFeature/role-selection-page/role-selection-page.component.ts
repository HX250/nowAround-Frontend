import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CustomAuthService } from 'src/app/services/authService/auth.service';

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
    private authServ: CustomAuthService,
    public auth: AuthService,
  ) {}

  closeRoleSelection() {
    this.windowShown = !this.windowShown;
    this.updatedWindowShown.emit(this.windowShown);
  }
  closeModalWindow() {
    this.windowShown = !this.windowShown;
    this.updatedWindowShown.emit(this.windowShown);
  }

  loginWithRedirect(): void {
    this.authServ.loginWithRedirect();
  }
}
