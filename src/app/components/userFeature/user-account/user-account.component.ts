import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent implements OnInit {
  popUpHidden: boolean = true;
  constructor(public auth0: AuthService) {}

  ngOnInit(): void {
    this.auth0.user$.subscribe((user) => {
      if (user) {
      }
    });
  }
}
