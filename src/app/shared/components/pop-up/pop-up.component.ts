import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css',
})
export class PopUpComponent {
  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() footerMessage: string | undefined;
}
