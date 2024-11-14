import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(public authServ: CustomAuthService) {}
}
