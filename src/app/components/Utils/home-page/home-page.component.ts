import { Component, ViewChild } from '@angular/core';
import { MapComponent } from '../../mapFeature/map/map.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
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
