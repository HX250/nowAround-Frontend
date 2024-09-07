import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-role-selection-page',
  templateUrl: './role-selection-page.component.html',
  styleUrls: ['./role-selection-page.component.css'],
})
export class RoleSelectionPageComponent {
  @Input() windowShown: boolean | undefined;
  @Output() updatedWindowShown = new EventEmitter<boolean>();
  @Output() closeWindowWhenClickOutside = new EventEmitter<boolean>();

  closeRoleSelection() {
    this.windowShown = !this.windowShown;
    this.updatedWindowShown.emit(this.windowShown);
  }
  closeModalWindow() {
    this.windowShown = !this.windowShown;
    this.updatedWindowShown.emit(this.windowShown);
  }

  guestAccountButton() {
    localStorage.setItem('role', 'guest');
    window.location.reload();
  }
}
