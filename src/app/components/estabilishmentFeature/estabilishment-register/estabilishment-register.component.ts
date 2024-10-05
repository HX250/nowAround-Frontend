import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstabilishmentService } from 'src/app/services/estabilishmentService/estabilishment.service';

@Component({
  selector: 'app-estabilishment-register',
  templateUrl: './estabilishment-register.component.html',
  styleUrls: ['./estabilishment-register.component.css'],
})
export class EstabilishmentRegisterComponent {
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
      establishmentName: [''],
      establishmentCategory: [[]],
      establishmentPrize: [''],
      establishmentAddress: [''],
      establishmentCity: [''],
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
  }

  registerEstablishment() {
    if (this.establishmentRegister.valid) {
      this.establishmentRegister.patchValue({
        establishmentTags: this.establishmentTags,
        establishmentCategory: this.establishmentCategory,
      });
      this.estServ.estabilishmentInfo.establishmentInfo =
        this.establishmentRegister.value;
      console.log(this.estServ.estabilishmentInfo);
    } else {
      console.log('Form is invalid');
    }
  }

  get f() {
    return this.establishmentRegister.controls;
  }
}
