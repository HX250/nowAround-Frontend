import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/adminService/admin.service';

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
export class AdminPageComponent implements OnInit {
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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllPendingEstablishments().subscribe({
      next: (Response) => {
        console.log(Response);
      },
      error: (Error) => {
        console.log(Error);
      },
    });
  }

  processEstablishmentRegistration($event: MouseEvent, estID: number) {
    const buttonText = ($event.target as HTMLButtonElement).innerText;
    this.adminService.proccessEstablishment(buttonText, estID);
  }
}
