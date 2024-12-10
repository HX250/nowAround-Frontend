import { estInfo } from './estInfo.model';
import { posts } from './posts.model';
import { profile } from './profile.model';
import { review } from './completeReview.model';
import { tabs } from './tabs.model';

export interface establishmentProfile {
  genericInformation: profile;
  posts: posts[];
  tabs: tabs[];
  estInfo: estInfo;
  reviews: review;
}
