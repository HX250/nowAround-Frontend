import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-establishment-edit',
  standalone: true,
  imports: [],
  templateUrl: './establishment-edit.component.html',
  styleUrl: './establishment-edit.component.css',
})
export class EstablishmentEditComponent {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
