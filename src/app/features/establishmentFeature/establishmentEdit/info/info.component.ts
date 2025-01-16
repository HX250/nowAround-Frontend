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
  establishmentTags: string[] = [];
  establishmentCategory?: string[] = [];
  catError: string = '';
  tagError: string = '';

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
        this.establishmentTags = this.estProfile?.tags || [];
        this.buildForm();
      });
  }

  buildForm() {
    this.updatedGenericInfo = this.fb.group({
      name: [this.estProfile?.name],
      description: [this.estProfile?.description],
      priceCategory: [this.pipePriceRange()],
      categories: [this.estProfile?.categories],
      tags: [this.estProfile?.tags],
    });
  }

  pipePriceRange() {
    if (this.estProfile?.priceRange == 'Affordable') {
      return '0';
    } else if (this.estProfile?.priceRange == 'Moderate') {
      return '1';
    } else {
      return '2';
    }
  }
  addCategory(category: string) {
    if (this.establishmentCategory?.length === 3) {
      this.catError = 'maxCat';
      return;
    }

    if (!this.establishmentCategory?.includes(category)) {
      this.establishmentCategory = [...this.establishmentCategory!, category];
      this.updatedGenericInfo.patchValue({
        categories: this.establishmentCategory,
      });
    } else {
      this.establishmentCategory = [...this.establishmentCategory!];
      this.updatedGenericInfo.patchValue({
        categories: this.establishmentCategory,
      });
    }
  }

  addTag(tag: string) {
    if (this.establishmentTags?.includes(tag)) {
      this.establishmentTags = this.establishmentTags.filter(
        (existingTag) => existingTag !== tag,
      );
    } else {
      if (this.establishmentTags!.length >= 5) {
        this.tagError = 'maxTags';
        return;
      }
      this.establishmentTags = [...this.establishmentTags, tag];
      this.tagError = '';
    }

    this.updatedGenericInfo.patchValue({
      tags: this.establishmentTags,
    });
  }

  removeCategory(category: string) {
    this.establishmentCategory = this.establishmentCategory!.filter(
      (cat) => cat !== category,
    );
    this.updatedGenericInfo.patchValue({
      categories: this.establishmentCategory,
    });
  }

  updateProfile() {
    this.estServ
      .updateGenericInfoProfile(this.updatedGenericInfo.value)
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  get f() {
    return this.updatedGenericInfo.controls;
  }
}
