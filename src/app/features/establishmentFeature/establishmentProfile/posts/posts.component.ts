import { Component, OnInit } from '@angular/core';
import { posts } from '../../models/profile/posts.model';
import { CommonModule } from '@angular/common';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  postList?: posts[] = [];

  constructor(private estServ: EstabilishmentService) {}

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.estServ
      .returnSpecificProfileInfo<posts[]>('posts')
      .subscribe((Response) => {
        this.postList = Response;
      });
  }
}
