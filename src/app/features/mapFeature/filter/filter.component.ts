import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MapService } from '../../../core/services/map/map.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @Output() filtersChanged = new EventEmitter<any>();
  @Output() updateFilterWindow = new EventEmitter<boolean>();
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
  chosenTags: string[] = [];

  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mapService: MapService,
  ) {
    this.filterForm = this.fb.group({
      searchByName: [''],
      byPriceRange: [''],
      byCategory: [''],
      byTag: [[]],
    });
  }
  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe((values) => {
      this.updateFilterParams(values);
      this.filtersChanged.emit();
    });
  }

  updateFilterParams(values: any): void {
    this.mapService.filterParams = {
      name: values.searchByName || '',
      byPriceRange: values.byPriceRange || '',
      categoryName: values.byCategory || '',
      tagNames: values.byTag || [],
    };
  }

  toggleFilterWindow() {
    this.filterWindow = !this.filterWindow;
    this.updateFilterWindow.emit(this.filterWindow);
  }

  addTag(tag: string) {
    if (this.chosenTags.includes(tag)) {
      this.chosenTags = this.chosenTags.filter((t) => t !== tag);
    } else {
      this.chosenTags.push(tag);
    }

    this.filterForm.patchValue({
      byTag: this.chosenTags,
    });
  }

  get f() {
    return this.filterForm.controls;
  }
}
