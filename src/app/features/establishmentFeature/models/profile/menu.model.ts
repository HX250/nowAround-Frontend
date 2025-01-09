export interface Menu {
  id: string;
  name: string;
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  url: string;
  description: string;
  price: number;
}
