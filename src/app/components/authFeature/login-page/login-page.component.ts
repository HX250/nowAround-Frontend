import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/loginService/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  loginError: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  clearError() {
    this.loginError = false;
  }

  login() {
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
  }
}
