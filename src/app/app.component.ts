import { Component, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Output() updateNavBar = new EventEmitter<boolean>();
  title = 'NowAround';
}
