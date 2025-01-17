import { locationInfo } from './estInfo.model';
import { posts } from './posts.model';
import { profile } from './profile.model';
import { ratingStatistic } from './completeReview.model';
import { Menu } from './menu.model';
import { Events } from './events.model';

export interface establishmentProfile {
  auth0Id: string;
  genericInfo: profile;
  posts: posts[];
  menus: Menu[];
  events: Events[];
  locationInfo: locationInfo;
  ratingStatistic: ratingStatistic;
}
