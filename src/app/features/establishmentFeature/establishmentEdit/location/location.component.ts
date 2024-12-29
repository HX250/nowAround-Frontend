import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { locationInfo } from '../../models/profile/estInfo.model';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css',
})
export class LocationComponent implements OnInit {
  private profileSubscription!: Subscription;
  locationInfo: locationInfo | undefined;
  constructor(private estServ: EstabilishmentService) {}

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.profileSubscription = this.estServ
      .returnSpecificProfileInfo<locationInfo>('locationInfo')
      .subscribe((Response) => {
        this.locationInfo = Response;
        //this.buildForm();
      });
  }
}
