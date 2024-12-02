import { Component } from '@angular/core';
import { tabs } from '../../models/profile/tabs.model';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent {
  tabList: tabs[] = [];

  constructor(private estServ: EstabilishmentService) {}

  ngOnInit(): void {
    const profile = this.estServ.getProfile();
    this.tabList = profile?.tabs || [];
  }
}
