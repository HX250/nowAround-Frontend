import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { alertState } from './model/alert-state.model';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() alertState: alertState | undefined;
}
