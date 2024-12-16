import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { InfoComponent } from './info/info.component';
import { LocationComponent } from './location/location.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-establishment-edit',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    InfoComponent,
    LocationComponent,
    MenuComponent,
  ],
  templateUrl: './establishment-edit.component.html',
  styleUrl: './establishment-edit.component.css',
})
export class EstablishmentEditComponent {
  scrollTo(section: HTMLElement) {
    section.scrollIntoView();
  }
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
