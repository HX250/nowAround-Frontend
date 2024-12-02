import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { alertState } from '../../../shared/components/alert/model/alert-state.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private translate: TranslateService) {}

  private alertSubject = new BehaviorSubject<alertState>({
    isShown: false,
    message: '',
  });
  alertState$ = this.alertSubject.asObservable();

  removeAlert() {
    this.alertSubject.next({ isShown: false, message: '', status: false });
  }

  showAlert(message: string, status: boolean) {
    const translatedMessage = this.translate.instant(message);
    this.alertSubject.next({
      isShown: true,
      message: translatedMessage,
      status: status,
    });
    setTimeout(() => {
      this.removeAlert();
    }, 4000);
  }
}
