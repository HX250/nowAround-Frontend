import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { dialog } from '../../../shared/components/dialog/model/dialog.mode';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private translate: TranslateService) {}

  private dialogResultSubject = new BehaviorSubject<boolean | null>(null);
  private dialogSubject = new BehaviorSubject<dialog>({
    isShown: false,
    headline: '',
    message: '',
    buttons: {
      firstButtonText: '',
      secondButtonText: '',
    },
  });

  dialogResult$ = this.dialogResultSubject.asObservable();
  dialogState$ = this.dialogSubject.asObservable();

  showDialog(
    headline: string,
    message: string,
    firstButtonText: string,
    secondButtonText: string,
  ) {
    const translatedMessage = this.translate.instant(message);
    const translatedHeadline = this.translate.instant(headline);
    this.dialogResultSubject.next(null);
    this.dialogSubject.next({
      isShown: true,
      headline: translatedHeadline,
      message: translatedMessage,
      buttons: {
        firstButtonText: firstButtonText,
        secondButtonText: secondButtonText,
      },
    });
  }

  confirmDialog() {
    this.dialogResultSubject.next(true);
    this.removeDialog();
  }

  declineDialog() {
    this.dialogResultSubject.next(false);
    this.removeDialog();
  }

  removeDialog() {
    this.dialogSubject.next({
      isShown: false,
      headline: '',
      message: '',
      buttons: {
        firstButtonText: '',
        secondButtonText: '',
      },
    });
  }
}
