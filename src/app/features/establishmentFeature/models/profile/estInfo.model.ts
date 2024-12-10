export interface estInfo {
  address: string;
  city: string;
  postal: string;
  socials?: string[];
  openingHoursVal?: Record<string, string>;
  openingHours?: boolean;
  lng: number;
  lat: number;
}
