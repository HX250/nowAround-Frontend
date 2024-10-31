import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-establishment-register',
  templateUrl: './establishment-register.component.html',
  styleUrls: ['./establishment-register.component.css'],
})
export class EstablishmentRegisterComponent {
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
  previewImage: any;

  constructor(private fb: FormBuilder) {
    this.establishmentRegister = fb.group({
      establishmentPhoto: [],
      establishmentName: ['', Validators.required],
      establishmentCategory: [[], Validators.required],
      establishmentPrice: ['', Validators.required],
      establishmentAddress: ['', Validators.required],
      establishmentCity: ['', Validators.required],
      establishmentTags: [[], Validators.required],
      establishmentPostalCode: [
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
      establishmentCategory: this.establishmentCategory,
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
      establishmentTags: this.establishmentTags,
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewImage = reader.result as string;

        this.establishmentRegister.patchValue({
          establishmentPhoto: formData,
        });
      };
    }
  }

  get f() {
    return this.establishmentRegister.controls;
  }
}
