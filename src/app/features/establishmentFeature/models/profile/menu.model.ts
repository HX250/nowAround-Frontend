export interface Menu {
  id: string;
  name: string;
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  pictureUrl: string;
  description: string;
  price: number;
}
