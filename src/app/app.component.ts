import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AlertComponent } from './shared/components/alert/alert.component';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log(environment.API_END_POINT, environment.MAPBOX_TOKEN);
  }
  title = 'nowAroundFE';
}
