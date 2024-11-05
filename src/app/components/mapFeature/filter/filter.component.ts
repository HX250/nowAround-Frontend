import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  filterWindow: boolean = true;
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

  @Output() updateFilterWindow = new EventEmitter<boolean>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      searchByName: [''],
      byPriceRange: [0],
      byCategory: [''],
    });
  }

  toggleFilterWindow() {
    this.filterWindow = !this.filterWindow;
    this.updateFilterWindow.emit(this.filterWindow);
  }
}
