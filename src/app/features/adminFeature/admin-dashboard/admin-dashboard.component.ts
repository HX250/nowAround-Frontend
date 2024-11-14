import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs';
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from 'chart.js';
import { adminEstablishment } from '../models/admin-est.model';
import { adminStats } from '../models/admin-statistics.model';
import { AdminService } from '../../../core/services/admin/admin.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  establishments: adminEstablishment[] = [];
  adminStats: adminStats[] = [];
  public chart: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadPendingEstablishments();
    this.loadUserStatistics();
  }
  loadUserStatistics() {
    this.adminService.getUserStatistics().subscribe({
      next: (Response: any) => {
        this.adminStats = Response;
        console.log(this.adminStats);
        this.createFirstChart();
      },
      error: (Error: any) => {
        console.log(Error);
      },
    });
  }

  loadPendingEstablishments(): void {
    this.adminService.getAllPendingEstablishments().subscribe({
      next: (response) => {
        this.establishments = response;
      },
      error: (error) => {
        console.error('Error fetching establishments:', error);
      },
    });
  }

  processEstablishmentRegistration($event: MouseEvent, estID: string) {
    const buttonText = ($event.target as HTMLButtonElement).innerText;
    this.adminService
      .proccessEstablishment(buttonText, estID)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.loadPendingEstablishments();
        },
        error: (error) => {
          console.error('Error processing establishment:', error);
        },
      });
  }
  createFirstChart() {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale,
    );

    this.chart = new Chart('chartOne', {
      type: 'line',
      data: {
        labels: this.adminStats.map((row) => row.date),
        datasets: [
          {
            label: 'resgisteredUsers',
            data: [
              '32',
              '40',
              '28',
              '34',
              '82',
              '54',
              '60',
              '34',
              '64',
              '53',
              '42',
              '35',
              '52',
              '48',
            ], //this.adminStats.map((row) => row.usersCreatedCount)
            backgroundColor: 'orange',
          },
        ],
      },
      options: {
        aspectRatio: 2.6,
      },
    });
    this.chart = new Chart('chartTwo', {
      type: 'line',
      data: {
        labels: this.adminStats.map((row) => row.date),
        datasets: [
          {
            label: 'registeredEstablishments',
            data: [
              '4',
              '2',
              '4',
              '6',
              '8',
              '1',
              '2',
              '9',
              '12',
              '24',
              '15',
              '20',
              '18',
              '28',
            ], //this.adminStats.map((row) => row.establishmentsCreatedCount),
            backgroundColor: 'orange',
          },
        ],
      },
      options: {
        aspectRatio: 2.6,
      },
    });
  }
}
