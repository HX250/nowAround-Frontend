import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css'],
})
export class PopupWindowComponent {
  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() footerMessage: string | undefined;
}
