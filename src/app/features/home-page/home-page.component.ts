import { Component, ViewChild } from '@angular/core';
import { MapComponent } from '../mapFeature/map/map.component';
import { FilterComponent } from '../mapFeature/filter/filter.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MapComponent, FilterComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  isFilterWindowShown: boolean = true;
  updateWindowBool() {
    this.isFilterWindowShown = !this.isFilterWindowShown;
  }

  onFiltersChanged() {
    this.mapComponent.updateFilteredMarkers();
  }
}
