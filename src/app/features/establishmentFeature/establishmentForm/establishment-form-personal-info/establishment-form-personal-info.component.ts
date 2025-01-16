import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-establishment-form-personal-info',
  standalone: true,
  imports: [TranslateModule, NgIf, ReactiveFormsModule],
  templateUrl: './establishment-form-personal-info.component.html',
  styleUrl: './establishment-form-personal-info.component.css',
})
export class EstablishmentFormPersonalInfoComponent {
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
