import { Component, OnDestroy, OnInit } from '@angular/core';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { profile } from '../../models/profile/profile.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent implements OnInit, OnDestroy {
  estProfile: profile | undefined;
  updatedGenericInfo!: FormGroup;
  private profileSubscription!: Subscription;
  tags: string[] = [
    'PET_FRIENDLY',
    'OUTDOOR_SEATING',
    'WIFI_AVAILABLE',
    'RESERVATIONS_ACCEPTED',
    'WHEELCHAIR_ACCESSIBLE',
    'LIVE_ENTERTAINMENT',
    'TAKEOUT_AVAILABLE',
    'PARKING_AVAILABLE',
    'FAMILY_FRIENDLY',
    'DAILY_SPECIALS',
    'BAR_SERVICE',
    'LIVE_SPORTS_VIEWING',
    'EVENT_HOSTING',
    'SMOKING_AREA',
    'NON_SMOKING',
  ];
  category: string[] = [
    'CAFE',
    'BAR',
    'NIGHTCLUB',
    'MUSEUM',
    'ART_GALLERY',
    'FESTIVAL',
    'PARK',
    'GYM',
    'CINEMA',
    'RESTAURANT',
  ];
  establishmentTags?: string[] = [];
  establishmentCategory?: string[] = [];

  constructor(
    private estServ: EstabilishmentService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.profileSubscription = this.estServ
      .returnSpecificProfileInfo<profile>('genericInfo')
      .subscribe((Response) => {
        this.estProfile = Response;
        this.establishmentCategory = this.estProfile?.categories;
        this.establishmentTags = this.estProfile?.tags;
        this.buildForm();
      });
  }

  buildForm() {
    this.updatedGenericInfo = this.fb.group({
      companyName: [this.estProfile?.name],
      category: [[this.estProfile?.categories]],
      tags: [[this.estProfile?.tags]],
      priceCategory: [this.estProfile?.priceRange],
    });
  }

  updateGenericInfo() {
    console.log(this.updatedGenericInfo.value);
  }

  addCategory(category: string) {
    if (this.establishmentCategory?.length === 3) {
      return;
    }
    if (!this.establishmentCategory?.includes(category)) {
      this.establishmentCategory?.push(category);
    }

    this.updatedGenericInfo.patchValue({
      category: this.establishmentCategory,
    });
  }

  addTag(val: string) {
    if (
      !this.establishmentTags?.includes(val) &&
      this.establishmentTags!.length >= 5
    ) {
      return;
    }
    if (this.establishmentTags?.includes(val)) {
      const index = this.establishmentTags?.indexOf(val);
      this.establishmentTags?.splice(index, 1);
    } else {
      this.establishmentTags?.push(val);
    }

    this.updatedGenericInfo.patchValue({
      tags: this.establishmentTags,
    });
  }

  removeCategory(category: string) {
    const index = this.establishmentCategory!.indexOf(category);
    this.establishmentCategory!.splice(index, 1);
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }
}
