import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  constructor(private cookieService: CookieService) {}

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
}
