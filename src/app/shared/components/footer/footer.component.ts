import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomAuthService } from '../../../core/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  role$!: Observable<string>;

  constructor(public authServ: CustomAuthService) {}

  ngOnInit(): void {
    this.role$ = this.authServ.roleState$;
  }
}
