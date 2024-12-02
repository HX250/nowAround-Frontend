import { Component, OnInit } from '@angular/core';
import { estInfo } from '../../models/profile/estInfo.model';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent implements OnInit {
  infoList: estInfo[] = [];

  constructor(private estServ: EstabilishmentService) {}

  ngOnInit(): void {
    const profile = this.estServ.getProfile();
    this.infoList = profile?.estInfo || [];
  }
}
