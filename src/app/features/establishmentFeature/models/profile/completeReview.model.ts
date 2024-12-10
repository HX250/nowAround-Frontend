import { IndividualReview } from './review.model';

export interface review {
  overallStars: { [key: string]: number };
  review: IndividualReview[];
}
