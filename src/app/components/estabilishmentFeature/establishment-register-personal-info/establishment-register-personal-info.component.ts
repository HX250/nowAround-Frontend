import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstabilishmentService } from 'src/app/services/estabilishmentService/estabilishment.service';

@Component({
  selector: 'app-establishment-register-personal-info',
  templateUrl: './establishment-register-personal-info.component.html',
  styleUrls: ['./establishment-register-personal-info.component.css'],
})
export class EstablishmentRegisterPersonalInfoComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estServ: EstabilishmentService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      ],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.estServ.estabilishmentInfo.personalInfo = this.registerForm.value;
      this.router.navigateByUrl('establishment-register');
    }
  }

  userInfo() {
    console.log(this.estServ.estabilishmentInfo.personalInfo);
    console.log(this.estServ.body);
  }

  get f() {
    return this.registerForm.controls;
  }
}
