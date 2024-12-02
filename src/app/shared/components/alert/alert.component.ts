import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { alertState } from './model/alert-state.model';
import { AlertService } from '../../../core/services/alert/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  alertState: alertState = {
    isShown: undefined,
    message: '',
    status: undefined,
  };

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alertState$.subscribe((state) => {
      this.alertState = state;
    });
  }
}
