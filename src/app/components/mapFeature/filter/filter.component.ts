import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapService } from 'src/app/services/mapService/map.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<any>();

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

  @Output() updateFilterWindow = new EventEmitter<boolean>();
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
      byPriceRange: values.byPriceRange || null,
      categoryName: values.byCategory || null,
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
}
