import { Component } from '@angular/core';
import { CustomAuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(public authServ: CustomAuthService) {}
}
