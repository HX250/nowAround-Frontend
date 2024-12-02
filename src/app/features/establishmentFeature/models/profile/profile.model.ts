export interface profile {
  authId: string;
  photo?: string;
  name: string;
  review: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  tags: string[];
  categories: string[];
  priceRange: string;
  cousine?: string[];
}
