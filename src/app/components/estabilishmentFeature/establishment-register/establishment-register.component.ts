import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstabilishmentService } from 'src/app/services/estabilishmentService/estabilishment.service';

@Component({
  selector: 'app-establishment-register',
  templateUrl: './establishment-register.component.html',
  styleUrls: ['./establishment-register.component.css'],
})
export class EstablishmentRegisterComponent {
  establishmentRegister: FormGroup;
  tags: string[] = [
    'Smoking',
    'Child friendly',
    'Pet friendly',
    'No smoking',
    'nextcat',
    'nexttcat',
  ];
  establishmentTags: string[] = [];
  category = ['Restaurant', 'Bar', 'Cinema', 'Theatre'];
  establishmentCategory: string[] = [];
  catError: string = '';
  tagError: string = '';

  constructor(
    private fb: FormBuilder,
    private estServ: EstabilishmentService,
  ) {
    this.establishmentRegister = fb.group({
      establishmentPhoto: [''],
      establishmentName: ['', Validators.required],
      establishmentCategory: [[]],
      establishmentPrize: ['', Validators.required],
      establishmentAddress: ['', Validators.required],
      establishmentCity: ['', Validators.required],
      establishmentTags: [[]],
    });
  }

  removeCategory(category: string) {
    const index = this.establishmentCategory.indexOf(category);
    this.establishmentCategory.splice(index, 1);
    this.catError = '';
  }

  addCategory(category: string) {
    if (this.establishmentCategory.length === 3) {
      this.catError = 'Can select only 3 categories';
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
      this.tagError = 'You can only select up to 5 tags';
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

  get f() {
    return this.establishmentRegister.controls;
  }
}
