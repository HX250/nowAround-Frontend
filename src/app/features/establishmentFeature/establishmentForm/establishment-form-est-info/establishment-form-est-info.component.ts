import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-establishment-form-est-info',
  standalone: true,
  imports: [TranslateModule, NgIf, ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './establishment-form-est-info.component.html',
  styleUrl: './establishment-form-est-info.component.css',
})
export class EstablishmentFormEstInfoComponent {
  establishmentRegister: FormGroup;
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
  establishmentTags: string[] = [];
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
  establishmentCategory: string[] = [];
  catError: string = '';
  tagError: string = '';

  constructor(private fb: FormBuilder) {
    this.establishmentRegister = fb.group({
      name: ['', Validators.required],
      category: [[], Validators.required],
      priceCategory: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      tags: [[], Validators.required],
      postalCode: [
        '',
        [Validators.required, Validators.pattern('^\\d{3} \\d{2}$')],
      ],
    });
  }

  removeCategory(category: string) {
    const index = this.establishmentCategory.indexOf(category);
    this.establishmentCategory.splice(index, 1);
    this.catError = '';
  }

  addCategory(category: string) {
    if (this.establishmentCategory.length === 3) {
      this.catError = 'maxCat';
      return;
    }
    if (!this.establishmentCategory.includes(category)) {
      this.establishmentCategory.push(category);
    }

    this.establishmentRegister.patchValue({
      category: this.establishmentCategory,
    });
  }

  addTag(val: string) {
    if (
      !this.establishmentTags.includes(val) &&
      this.establishmentTags.length >= 5
    ) {
      this.tagError = 'maxTags';
      return;
    } else {
      this.tagError = '';
    }
    if (this.establishmentTags.includes(val)) {
      const index = this.establishmentTags.indexOf(val);
      this.establishmentTags.splice(index, 1);
    } else {
      this.establishmentTags.push(val);
    }

    this.establishmentRegister.patchValue({
      tags: this.establishmentTags,
    });
  }

  get f() {
    return this.establishmentRegister.controls;
  }
}
