import { Component, computed, OnInit } from '@angular/core';
import { posts } from '../../models/profile/posts.model';
import { CommonModule } from '@angular/common';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAuthService } from '../../../../core/services/auth/auth.service';

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
  ) {}

  ngOnInit(): void {
    this.getProfileData();
    this.loadImages();
  }

  loadImages() {
    for (let i = 0; i <= this.postList.length; i++) {
      console.log(this.postList[i].pictureUrl);
    }
  }

  getProfileData() {
    this.estServ
      .returnSpecificProfileInfo<posts[]>('posts')
      .subscribe((Response) => {
        this.postList = Response ?? [];
        console.log(this.postList);
      });
  }

  deletePost(postId: string) {
    this.estServ.deletePost(postId).subscribe();
  }

  onFileChange(event: any, where?: string) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPEG and PNG formats are allowed.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must not exceed 5MB.');
        return;
      }

      const previewReader = new FileReader();
      previewReader.onload = () => {
        const dataUrl = previewReader.result as string;
        this.postPreviewImage = dataUrl;
      };

      const binaryReader = new FileReader();
      binaryReader.onload = () => {
        const arrayBuffer = binaryReader.result as ArrayBuffer;
        const binaryString = Array.from(new Uint8Array(arrayBuffer))
          .map((byte) => byte.toString(2).padStart(8, '0'))
          .join(' ');
        console.log(binaryString);
      };

      previewReader.onerror = binaryReader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Failed to load the file. Please try again.');
      };

      previewReader.readAsDataURL(file);
      binaryReader.readAsArrayBuffer(file);
    }
  }
}
