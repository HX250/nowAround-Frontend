import { Injectable } from '@angular/core';

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

  constructor() {}

  registerEstablishment() {
    console.log(this.estabilishmentInfo);
  }
}
