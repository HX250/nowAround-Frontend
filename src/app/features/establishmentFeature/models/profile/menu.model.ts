export interface Menu {
  name: string;
  menuItems: MenuItem[];
}

export interface MenuItem {
  name: string;
  url: string;
  description: string;
  price: string;
}
