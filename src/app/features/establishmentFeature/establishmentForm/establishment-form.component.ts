import { Component, ViewChild } from '@angular/core';
import { PopUpComponent } from '../../../shared/components/pop-up/pop-up.component';
import { EstablishmentFormPersonalInfoComponent } from './establishment-form-personal-info/establishment-form-personal-info.component';
import { EstabilishmentService } from '../../../core/services/establishment/establishment.service';
import { take } from 'rxjs';
import { EstablishmentFormEstInfoComponent } from './establishment-form-est-info/establishment-form-est-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-establishment-form',
  standalone: true,
  imports: [
    PopUpComponent,
    EstablishmentFormPersonalInfoComponent,
    EstablishmentFormEstInfoComponent,
    TranslateModule,
    NgIf,
  ],
  templateUrl: './establishment-form.component.html',
  styleUrl: './establishment-form.component.css',
})
export class EstablishmentFormComponent {
  error: boolean = false;
  popUpHidden: boolean = true;
  estEmail: string = '';

  @ViewChild(EstablishmentFormEstInfoComponent)
  establishmentRegisterComponent!: EstablishmentFormEstInfoComponent;
  @ViewChild(EstablishmentFormPersonalInfoComponent)
  personalInfoComponent!: EstablishmentFormPersonalInfoComponent;

  constructor(private estService: EstabilishmentService) {}

  registerEstablishment() {
    const { valid: personalValid, value: personalInfo } =
      this.personalInfoComponent.registerForm;
    const { valid: establishmentValid, value: establishmentInfo } =
      this.establishmentRegisterComponent.establishmentRegister;

    if (personalValid && establishmentValid) {
      const completeFormData = { personalInfo, establishmentInfo };
      console.log(completeFormData);

      this.estService
        .registerEstablishment(completeFormData)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            console.log('Establishment registered successfully', response);
          },
          error: (error) => {
            console.error('Error registering establishment', error);
          },
          complete: () => {
            this.estEmail = completeFormData.personalInfo.email;
            this.popUpHidden = false;
          },
        });
    } else {
      this.error = true;
    }
  }
}
