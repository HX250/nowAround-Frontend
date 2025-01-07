import { Component, OnInit } from '@angular/core';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { ratingStatistic } from '../../models/profile/completeReview.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomAuthService } from '../../../../core/services/auth/auth.service';
import { AuthService } from '@auth0/auth0-angular';
import { TranslateModule } from '@ngx-translate/core';
import { StarPipe } from '../../../../shared/pipe/start.pipe';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, StarPipe],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  reviewList: ratingStatistic | undefined = undefined;
  userReview: string = '';
  estID?: string = '';

  constructor(
    private estServ: EstabilishmentService,
    public customAuth: CustomAuthService,
    public auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.getProfileData();
    this.getProfileId();
  }

  getProfileData() {
    this.estServ
      .returnSpecificProfileInfo<ratingStatistic>('ratingStatistic')
      .subscribe((Response) => {
        this.reviewList = Response;
      });
  }

  getProfileId() {
    this.estServ.estProfileState$.subscribe((Response) => {
      this.estID = Response?.auth0Id;
    });
  }

  sendReview() {
    this.auth.user$.subscribe((Response) => {
      this.estServ
        .sendReview(this.estID, this.userReview, Response?.sub)
        .subscribe(() => {
          this.getProfileData();
        });
    });
  }

  getStarKeys(): string[] {
    return this.reviewList
      ? Object.keys(this.reviewList).filter((key) =>
          [
            'oneStar',
            'twoStar',
            'threeStars',
            'fourStars',
            'fiveStars',
          ].includes(key),
        )
      : [];
  }

  getRatingPercentage(star: string): number {
    const totalReviews = this.getTotalReviews();
    const ratingCount = (this.reviewList?.[star] as number) || 0;
    return totalReviews ? (ratingCount / totalReviews) * 100 : 0;
  }

  getTotalReviews(): number {
    return this.getStarKeys().reduce(
      (acc, star) => acc + ((this.reviewList?.[star] as number) || 0),
      0,
    );
  }
}
