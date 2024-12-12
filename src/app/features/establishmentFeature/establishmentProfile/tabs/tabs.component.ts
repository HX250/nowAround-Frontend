import { Component } from '@angular/core';
import { Menu } from '../../models/profile/menu.model';
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
  tabList: Menu[] = [];

  constructor(private estServ: EstabilishmentService) {}

  ngOnInit(): void {
    const profile = this.estServ.getProfile();
    console.log(profile);

    this.tabList = profile?.menus || [];
    console.log(this.tabList);
  }
}
