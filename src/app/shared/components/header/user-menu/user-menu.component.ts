import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
  constructor() {}
}
