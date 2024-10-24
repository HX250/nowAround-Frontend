import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-establishment-register-personal-info',
  templateUrl: './establishment-register-personal-info.component.html',
  styleUrls: ['./establishment-register-personal-info.component.css'],
})
export class EstablishmentRegisterPersonalInfoComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      //phoneNumber: [
      //  '',
      //  [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      //],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
}
