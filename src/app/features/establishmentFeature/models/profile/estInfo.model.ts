export interface locationInfo {
  address: string;
  city: string;
  businessHours?: Record<string, string>;
  long: number;
  lat: number;
}
