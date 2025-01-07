import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DialogService } from '../../../core/services/dialog/dialog.service';
import { dialog } from './model/dialog.mode';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  dialogState: dialog = {
    isShown: false,
    headline: '',
    message: '',
    buttons: {
      firstButtonText: '',
      secondButtonText: '',
    },
  };

  constructor(private dialog: DialogService) {}

  ngOnInit(): void {
    this.dialog.dialogState$.subscribe((state) => {
      this.dialogState = state;
    });
  }

  acceptDialog() {
    this.dialog.confirmDialog();
  }

  declineDialog() {
    this.dialog.declineDialog();
  }
}
