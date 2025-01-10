import { Component, computed } from '@angular/core';
import { posts } from '../../models/profile/posts.model';
import { CommonModule } from '@angular/common';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAuthService } from '../../../../core/services/auth/auth.service';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { Events } from '../../models/profile/events.model';

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

  deletePost(postId: string) {
    this.dialog.showDialog(
      'dialogRemovePost',
      'dialogRemoveItem-desc',
      'dialogRemoveItem-accept',
      'dialogRemoveItem-decline',
    );

    const subscription = this.dialog.dialogResult$.subscribe((result) => {
      if (result !== null) {
        console.log('Dialog result:', result);
        if (result) {
          this.estServ.deletePost(postId).subscribe();
          subscription.unsubscribe();
        } else {
          console.log('Item deletion cancelled');
          subscription.unsubscribe();
        }
      }
    });
  }
}
