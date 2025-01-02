import { Component, computed, EventEmitter, Output } from '@angular/core';
import { EstabilishmentService } from '../../../core/services/establishment/establishment.service';
import { MenuComponent } from './menu/menu.component';
import { Menu } from '../models/profile/menu.model';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  @Output() close = new EventEmitter<void>();
  isEditing = computed(() =>
    this.estServ.editMenu() || this.estServ.addEvent() || this.estServ.addPost()
      ? true
      : false,
  );

  constructor(private estServ: EstabilishmentService) {}

  closeModal() {
    this.close.emit();
    this.estServ.addEvent.set(false);
    this.estServ.addPost.set(false);
    this.estServ.editMenu.set(false);
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  getProfileData() {
    this.estServ
      .returnSpecificProfileInfo<Menu[]>('menus')
      .subscribe((Response) => {
        console.log(Response);
      });
  }

  addEvent() {
    this.estServ.addEvent.set(true);
  }
  addPost() {
    this.estServ.addPost.set(true);
  }
  addMenu() {
    this.estServ.editMenu.set(true);
  }
}
