import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-establishment-popup',
  templateUrl: './establishment-popup.component.html',
  styleUrls: ['./establishment-popup.component.css'],
})
export class EstablishmentPopupComponent {
  @Input() establishmentEmail: string | undefined;
}
