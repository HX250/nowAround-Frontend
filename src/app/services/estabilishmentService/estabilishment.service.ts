import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class EstabilishmentService {
  estabilishmentInfo: {
    personalInfo: {};
    establishmentInfo: {};
  } = {
    personalInfo: {},
    establishmentInfo: {},
  };

  body = { estabilishmentRegisterJSON: this.estabilishmentInfo };
  constructor() {}

  registerEstablishment(establishment: FormGroup) {
    console.log(establishment);
  }
}
