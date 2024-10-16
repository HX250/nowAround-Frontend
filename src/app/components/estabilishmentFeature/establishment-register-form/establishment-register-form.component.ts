import { Component, ViewChild } from '@angular/core';
import { EstablishmentRegisterComponent } from '../establishment-register/establishment-register.component';
import { EstablishmentRegisterPersonalInfoComponent } from '../establishment-register-personal-info/establishment-register-personal-info.component';
import { EstabilishmentService } from 'src/app/services/estabilishmentService/estabilishment.service';

@Component({
  selector: 'app-establishment-register-form',
  templateUrl: './establishment-register-form.component.html',
  styleUrls: ['./establishment-register-form.component.css'],
})
export class EstablishmentRegisterFormComponent {
  error: boolean = false;
  popUpHidden: boolean = true;

  @ViewChild(EstablishmentRegisterComponent)
  establishmentRegisterComponent!: EstablishmentRegisterComponent;
  @ViewChild(EstablishmentRegisterPersonalInfoComponent)
  personalInfoComponent!: EstablishmentRegisterPersonalInfoComponent;

  constructor(private estService: EstabilishmentService) {}

  registerEstablishment() {
    const { valid: personalValid, value: personalInfo } =
      this.personalInfoComponent.registerForm;
    const { valid: establishmentValid, value: establishmentInfo } =
      this.establishmentRegisterComponent.establishmentRegister;

    if (personalValid && establishmentValid) {
      const completeFormData = { personalInfo, establishmentInfo };
      this.estService.registerEstablishment(completeFormData).subscribe({
        next: (response) => {
          console.log('Success:', response);
        },
        error: (error) => {
          console.error('Error:', error);
        },
        complete: () => {
          this.popUpHidden = false;
          console.log('Request completed.');
        },
      });
    } else {
      this.error = true;
    }
  }
}
