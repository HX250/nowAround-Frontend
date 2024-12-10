import { Component, OnInit } from '@angular/core';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { review } from '../../models/profile/completeReview.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomAuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  reviewList: review | undefined = undefined;
  userReview: string = '';

  constructor(
    private estServ: EstabilishmentService,
    public auth: CustomAuthService,
  ) {}

  ngOnInit(): void {
    const profile = this.estServ.getProfile();
    this.reviewList = profile?.reviews;
    console.log(this.reviewList);
    this.estServ.estProfileState$.subscribe((Response) => {
      console.log(Response);
    });
  }
  sendReview() {
    console.log(this.userReview);
  }
  getStarKeys(): string[] {
    return Object.keys(this.reviewList?.overallStars || {});
  }

  getRatingPercentage(star: string): number {
    const totalReviews = this.getTotalReviews();
    const ratingCount = this.reviewList?.overallStars[star] || 0;
    return totalReviews ? (ratingCount / totalReviews) * 100 : 0;
  }

  getTotalReviews(): number {
    return Object.values(this.reviewList?.overallStars || {}).reduce(
      (acc, count) => acc + count,
      0,
    );
  }
}
