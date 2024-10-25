import { Component } from '@angular/core';

interface Establishment {
  establishmentId: number;
  establishmentName: string;
  ownerName: string;
}
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  establishments: Establishment[] = [
    {
      establishmentId: 1,
      establishmentName: 'Cafe Delight',
      ownerName: 'Alice Johnson',
    },
    {
      establishmentId: 2,
      establishmentName: 'Bistro Central',
      ownerName: 'Bob Smith',
    },
    {
      establishmentId: 3,
      establishmentName: 'The Foodie Spot',
      ownerName: 'Carol White',
    },
    {
      establishmentId: 4,
      establishmentName: 'Gourmet Kitchen',
      ownerName: 'David Brown',
    },
  ];
}
