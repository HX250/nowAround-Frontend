import { review } from './review.model';

export interface ratingStatistic {
  oneStar: number;
  twoStar: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
  reviews: review[];
  [key: string]: number | review[];
}
