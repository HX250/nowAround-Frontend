export interface Events {
  imageUrl?: string;
  title: string;
  body: string;
  dateOfEvent: Date;
  interests: string[];
  price: number;
  location: string;
  maxParticipants: string;
  eventDuration: number;
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
  first = '1 - 10',
  second = '11 - 20',
  third = '21 - 30',
  fourth = '31 - 40',
  fifth = '41 - 50',
  sixth = '50 +',
}
