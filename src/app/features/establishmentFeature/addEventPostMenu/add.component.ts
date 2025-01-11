import { Component, computed, EventEmitter, Output } from '@angular/core';
import { EstabilishmentService } from '../../../core/services/establishment/establishment.service';
import { MenuComponent } from './menu/menu.component';
import { Menu } from '../models/profile/menu.model';
import { TranslateModule } from '@ngx-translate/core';
import { EventComponent } from './event/event.component';
import { PostComponent } from './post/post.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MenuComponent,
    TranslateModule,
    EventComponent,
    PostComponent,
    CommonModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  @Output() close = new EventEmitter<void>();
  isEditing = computed(() =>
    this.estServ.addMenu() || this.estServ.addEvent() || this.estServ.addPost()
      ? true
      : false,
  );
  isAddingEvent = computed(() => (this.estServ.addEvent() ? true : false));
  isAddingPost = computed(() => (this.estServ.addPost() ? true : false));
  isAddingMenu = computed(() => (this.estServ.addMenu() ? true : false));

  constructor(private estServ: EstabilishmentService) {}

  closeModal() {
    this.close.emit();
    this.estServ.addEvent.set(false);
    this.estServ.addPost.set(false);
    this.estServ.addMenu.set(false);
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
    this.estServ.addMenu.set(true);
  }
}
