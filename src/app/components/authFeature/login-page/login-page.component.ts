import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LoginService } from 'src/app/services/auth/loginService/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginEmail: string = '';
  loginPassword: string = '';
  loginError: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private auth: AuthService,
  ) {}
  ngOnInit(): void {}

  getToken(): void {
    this.auth.getAccessTokenSilently({ detailedResponse: true }).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
    );
    this.auth.isAuthenticated$.subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  clearError() {
    this.loginError = false;
  }

  /* login() {
    this.loginService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (Response) => {
        this.router.navigateByUrl('/homepage');
        console.log(Response);
      },
      error: (Error) => {
        this.loginError = true;
        console.log(Error);
      },
    });
  }*/

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
    this.getToken();
  }
  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }
}
