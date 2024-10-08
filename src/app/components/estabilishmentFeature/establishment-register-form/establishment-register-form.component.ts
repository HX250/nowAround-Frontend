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
  @ViewChild(EstablishmentRegisterComponent)
  establishmentRegisterComponent!: EstablishmentRegisterComponent;
  @ViewChild(EstablishmentRegisterPersonalInfoComponent)
  personalInfoComponent!: EstablishmentRegisterPersonalInfoComponent;

  constructor(private estService: EstabilishmentService) {}

  registerEstablishment() {
    const personalInfo = this.personalInfoComponent.registerForm.value;
    const establishmentInfo =
      this.establishmentRegisterComponent.establishmentRegister.value;

    if (
      this.personalInfoComponent.registerForm.valid &&
      this.establishmentRegisterComponent.establishmentRegister.valid
    ) {
      const completeFormData = {
        personalInfo: personalInfo,
        establishmentInfo: establishmentInfo,
      };
      this.estService.estabilishmentInfo = completeFormData;
      this.estService.registerEstablishment();
    }
  }
}
