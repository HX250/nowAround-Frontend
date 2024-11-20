import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AlertComponent } from './shared/components/alert/alert.component';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from './core/services/alert/alert.service';
import { NgClass, NgIf } from '@angular/common';
import { alertState } from './shared/components/alert/model/alert-state.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'nowAroundFE';

  alertState: alertState = { isShown: false, message: '' };

  constructor(private alertService: AlertService) {}
  ngOnInit() {
    this.alertService.alertState$.subscribe((state) => {
      this.alertState = state;
    });
  }
}
