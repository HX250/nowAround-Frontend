import { Component, OnInit } from '@angular/core';
import { Establishment } from 'src/app/models/admin-est.model';
import { AdminService } from 'src/app/services/adminService/admin.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  establishments: Establishment[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadPendingEstablishments();
  }

  loadPendingEstablishments(): void {
    this.adminService.getAllPendingEstablishments().subscribe({
      next: (response) => {
        console.log(response);
        this.establishments = response;
      },
      error: (error) => {
        console.error('Error fetching establishments:', error);
      },
    });
  }

  processEstablishmentRegistration($event: MouseEvent, estID: string) {
    const buttonText = ($event.target as HTMLButtonElement).innerText;
    this.adminService.proccessEstablishment(buttonText, estID).subscribe({
      next: (response) => {
        this.loadPendingEstablishments();
      },
      error: (error) => {
        console.error('Error processing establishment:', error);
      },
    });
  }
}
