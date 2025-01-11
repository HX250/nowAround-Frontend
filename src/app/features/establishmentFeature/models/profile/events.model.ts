export interface Events {
  id: string;
  pictureUrl?: string;
  title: string;
  body: string;
  start: Date;
  end: Date;
  interestedUsers: string[];
  price: number;
  address: string;
  city: string;
  maxParticipants: string;
  eventCategory: EventCategory;
}

export enum EventCategory {
  Music = 'Music',
  Food = 'Food',
  Art = 'Art',
  Sports = 'Sports',
  Other = 'Other',
}

export enum maxParticipants {
  zero = '',
  first = '1 - 10',
  second = '11 - 20',
  third = '21 - 30',
  fourth = '31 - 40',
  fifth = '41 - 50',
  sixth = '50 +',
}
