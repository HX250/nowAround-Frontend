import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomAuthService } from '../../../core/services/auth/auth.service';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [NgIf, TranslateModule, CommonModule, RouterModule],
  templateUrl: './role-selection.component.html',
  styleUrl: './role-selection.component.css',
})
export class RoleSelectionComponent {
  @Input() windowShown: boolean | undefined;
  @Output() updatedWindowShown = new EventEmitter<boolean>();
  @Output() closeWindowWhenClickOutside = new EventEmitter<boolean>();

  token: string = '';

  constructor(private authServ: CustomAuthService, public auth: AuthService) {}

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
