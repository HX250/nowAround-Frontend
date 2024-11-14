import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent {
  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() footerMessage: string | undefined;
}
