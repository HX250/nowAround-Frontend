import { locationInfo } from './estInfo.model';
import { posts } from './posts.model';
import { profile } from './profile.model';
import { ratingStatistic } from './completeReview.model';
import { Menu } from './menu.model';

export interface establishmentProfile {
  authId: string;
  genericInformation: profile;
  posts: posts[];
  menus: Menu[];
  locationInfo: locationInfo;
  ratingStatistic: ratingStatistic;
}
