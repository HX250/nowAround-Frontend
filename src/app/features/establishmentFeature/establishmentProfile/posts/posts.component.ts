import { Component, computed, OnInit } from '@angular/core';
import { posts } from '../../models/profile/posts.model';
import { CommonModule } from '@angular/common';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAuthService } from '../../../../core/services/auth/auth.service';
import { DialogService } from '../../../../core/services/dialog/dialog.service';
import { interval, takeWhile } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  isLoggedIn = computed(() => (this.customAuth.estLogin() ? true : false));
  postList: posts[] = [];
  postPreviewImage: any;

  constructor(
    private estServ: EstabilishmentService,
    private customAuth: CustomAuthService,
    private dialog: DialogService,
  ) {}

  ngOnInit(): void {
    this.getProfileData();
    this.updatePosts();
  }
  updatePosts() {
    interval(8000)
      .pipe(takeWhile(() => !stop))
      .subscribe(() => {
        console.log('Updatol som');

        this.getProfileData();
      });
  }

  getProfileData() {
    this.estServ
      .returnSpecificProfileInfo<posts[]>('posts')
      .subscribe((Response) => {
        this.postList = Response ?? [];
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
