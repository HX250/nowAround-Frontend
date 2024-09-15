import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/auth/registerService/register.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  showPasswordValidation: boolean = false;
  registerError: boolean = false;

  constructor(private registerService: RegisterService) {}

  nameValidations = {
    regex: true,
  };
  emailValidations = {
    regex: true,
  };
  passwordValidations = {
    length: false,
    uppercase: false,
    lowercase: false,
  };
  repeatPassowrdValidations = {
    passwordsMatch: true,
  };

  checkValidations() {
    if (
      !this.nameValidations.regex ||
      !this.emailValidations.regex ||
      !this.passwordValidations.length ||
      !this.passwordValidations.uppercase ||
      !this.passwordValidations.lowercase ||
      !this.repeatPassowrdValidations.passwordsMatch
    ) {
      this.registerError = true;
      return;
    }
  }

  removeError() {
    this.registerError = false;
  }

  register() {
    this.checkValidations();
    this.registerService
      .register(
        this.firstName,
        this.lastName,
        this.email,
        this.password,
        this.repeatPassword,
      )
      .subscribe({
        next: (Response) => {
          console.log(Response);
        },
        error: (Error) => {
          console.log('User not registered');
        },
      });
  }

  validateName() {
    const nameRegex = /^[a-zA-Z]*$/;
    this.nameValidations.regex =
      nameRegex.test(this.firstName) && nameRegex.test(this.lastName);
  }

  validateEmail() {
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    this.emailValidations.regex = emailRegex.test(this.email);
  }

  validatePassword() {
    this.showPasswordValidation = this.password.length > 0;
    this.passwordValidations.length = this.password.length >= 6;
    this.passwordValidations.uppercase = /[A-Z]/.test(this.password);
    this.passwordValidations.lowercase = /[a-z]/.test(this.password);
    this.repeatPassowrdValidations.passwordsMatch =
      this.password == this.repeatPassword;
    if (
      this.passwordValidations.length &&
      this.passwordValidations.uppercase &&
      this.passwordValidations.lowercase
    ) {
      this.showPasswordValidation = !this.showPasswordValidation;
    }
  }

  validateRepeatPassword() {
    this.repeatPassowrdValidations.passwordsMatch =
      this.password == this.repeatPassword;
  }
}
