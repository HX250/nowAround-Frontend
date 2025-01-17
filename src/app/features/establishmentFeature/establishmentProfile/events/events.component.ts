import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAuthService } from '../../../../core/services/auth/auth.service';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { Events } from '../../models/profile/events.model';
import { ImageService } from '../../../../core/services/image/image.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent {
  isLoggedIn = computed(() => (this.customAuth.estLogin() ? true : false));
  eventList: Events[] = [];
  postPreviewImage: any;

  constructor(
    private estServ: EstabilishmentService,
    private customAuth: CustomAuthService,
    private dialog: DialogService,
    private imgService: ImageService,
  ) {}

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.estServ
      .returnSpecificProfileInfo<Events[]>('events')
      .subscribe((Response) => {
        this.eventList = Response ?? [];
      });
  }

  deleteEvent(eventId: string) {
    this.dialog.showDialog(
      'dialogRemoveEvent',
      'dialogRemoveItem-desc',
      'dialogRemoveItem-accept',
      'dialogRemoveItem-decline',
    );

    const subscription = this.dialog.dialogResult$.subscribe((result) => {
      if (result !== null) {
        if (result) {
          this.estServ.deleteEvent(eventId).subscribe();
          subscription.unsubscribe();
        } else {
          subscription.unsubscribe();
        }
      }
    });
  }

  addAccordingPhoto(where: string) {
    return this.imgService.addAccordingPhoto(where);
  }
}
