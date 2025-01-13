import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../../core/services/map/map.service';

import { pins } from '../models/pins.model';
import { AlertService } from '../../../core/services/alert/alert.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.dev';
import { marker } from '../models/marker.model';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map;
  private markers: { marker: mapboxgl.Marker; id: string }[] = [];
  style = 'mapbox://styles/mapbox/light-v11';
  lastBounds: mapboxgl.LngLatBounds | null = null;
  lat: number = 48.71847597430053;
  lng: number = 21.259273191588672;
  bufferZone: number = 0.3;

  constructor(
    private mapService: MapService,
    private alertService: AlertService,
    private router: Router,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.setUserLocation();
  }

  initializeMap(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.MAPBOX_TOKEN,
      container: 'map',
      style: this.style,
      zoom: 16,
      attributionControl: false,
      center: [this.lng, this.lat],
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserLocation: true,
    });

    this.map.addControl(geolocateControl, 'top-right');

    this.map.on('load', () => {
      const bounds = this.map?.getBounds();
      geolocateControl.trigger();
      this.callMapService(this.getCornersCords(bounds));
    });

    this.map.on('moveend', () => {
      const bounds = this.map?.getBounds();
      if (bounds) {
        if (
          !this.lastBounds ||
          !this.lastBounds.contains(bounds.getNorthWest()) ||
          !this.lastBounds.contains(bounds.getSouthEast())
        ) {
          this.callMapService(this.getCornersCords(bounds));
        }
      }

      if (bounds) {
        this.removeMarkersOutOfBounds(bounds);
      }

      this.lastBounds = this.extendBounds(bounds, this.bufferZone);
    });
  }

  setUserLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.initializeMap();
      },
      (error) => {
        console.error('Geolocation error: ', error);
        this.initializeMap();
      },
    );
  }

  updateFilteredMarkers(): void {
    this.removeAllMarkers();
    const bounds = this.map?.getBounds();
    if (bounds) {
      this.callMapService(this.getCornersCords(bounds));
    }
  }

  extendBounds(bounds: any, bufferPercentage: number): mapboxgl.LngLatBounds {
    const latDiff = (bounds.getNorth() - bounds.getSouth()) * bufferPercentage;
    const lngDiff = (bounds.getEast() - bounds.getWest()) * bufferPercentage;

    return new mapboxgl.LngLatBounds(
      [bounds.getWest() - lngDiff, bounds.getSouth() - latDiff],
      [bounds.getEast() + lngDiff, bounds.getNorth() + latDiff],
    );
  }

  removeMarkersOutOfBounds(bounds: mapboxgl.LngLatBounds | null | undefined) {
    this.markers = this.markers.filter((marker) => {
      const inBounds = bounds?.contains(marker.marker.getLngLat());
      if (!inBounds) {
        marker.marker.remove();
      }
      return inBounds;
    });
  }

  getCornersCords(bounds: mapboxgl.LngLatBounds | null | undefined): any {
    if (this.map) {
      if (bounds) {
        const boundaryPins: pins = {
          northWest: {
            lat: bounds.getNorthWest().lat,
            lng: bounds.getNorthWest().lng,
          },
          southEast: {
            lat: bounds.getSouthEast().lat,
            lng: bounds.getSouthEast().lng,
          },
        };
        return boundaryPins;
      }
    }
  }

  callMapService(boundaryPins: pins) {
    this.alertService.removeAlert();
    this.mapService.getEstablishmentsInArea(boundaryPins).subscribe({
      next: (Response) => {
        if (!Response || Response.length === 0) {
          this.alertService.showAlert('establishmentMarks-error', false);
          return;
        }
        const newMarkers = Response.filter(
          (res) =>
            !this.markers.some((markerObj) => markerObj.id === res.auth0Id),
        );
        console.log(Response);

        newMarkers.forEach((res) => {
          this.addCustomMarker(res);
        });
      },
      error: (error) => {
        this.alertService.showAlert('establishmentMarks-error', false);
      },
    });
  }

  addCustomMarker(mark: marker): void {
    const markerElement = document.createElement('div');
    markerElement.style.display = 'flex';
    markerElement.style.flexDirection = 'column';
    markerElement.style.alignItems = 'center';
    markerElement.style.transform = 'translateY(-100%)';

    const angOrange = `hsl(${getComputedStyle(document.documentElement).getPropertyValue('--color-orange').trim()})`;

    markerElement.innerHTML = `
    <svg
      width="40" height="40" viewBox="0 0 24 24"
      fill="${angOrange}" xmlns="http://www.w3.org/2000/svg"
      style="transform: translateY(-10%);"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 4.25 4.44 10.74 6.1 13.02.42.63 1.38.63 1.8 0C14.56 19.74 19 13.25 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
    <p class="m-0 text-sm text-ang-black text-center font-semibold">${mark.name}</p>
  `;

    const marker = new mapboxgl.Marker(markerElement)
      .setLngLat([mark.longitude, mark.latitude])
      .addTo(this.map!);

    this.markers.push({ marker, id: mark.auth0Id });

    markerElement.addEventListener('click', () => {
      this.showSmallEstablishment(marker, mark);
    });
  }

  showSmallEstablishment(marker: any, mark: marker) {
    this.map.flyTo({
      center: [mark.longitude, mark.latitude],
      zoom: 17,
      essential: true,
    });
    const localizedTags = this.localizeTags(mark.tags).join(', ');
    const popupHTML = `
<div class="w-fit h-fit flex flex-col gap-4 bg-ang-white p-4 ">
  <div class="flex h-fit items-center gap-2">
    <div class="h-6 w-6">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store">
        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>
      </svg>
    </div>
    <h3 class="text-lg font-semibold text-gray-800">${mark.name}</h3>
  </div>
  
  <div class="flex h-fit items-center gap-2">
   <div class="h-6 w-6 ">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-text">
        <path d="M17 6.1H3"/><path d="M21 12.1H3"/><path d="M15.1 18H3"/>
      </svg>
    </div>  
    <p>${mark.description}</p>
  </div>

  <div class="flex h-fit  gap-2">
    <div class="h-6 w-6">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tags">
        <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19"/><path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="6.5" cy="9.5" r=".5" fill="currentColor"/>
      </svg>
    </div>  
  <p>${localizedTags}</p>
  </div>
  
  <div class="flex h-fit items-center gap-2">
    <div class="h-6 w-6">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-euro">
        <path d="M4 10h12"/><path d="M4 14h9"/><path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"/>
      </svg>
  </div>  
    <p>${mark.priceCategory}</p>
  </div>
  
  <button class="bg-ang-orange text-ang-white text-sm rounded-md px-4 py-2 hover:bg-ang-orange/80 focus:outline-none focus:ring focus:ring-orange-300" id="visit-btn">
    Visit ${mark.name}
  </button>
</div>


      `;

    const popup = new mapboxgl.Popup({
      offset: 25,
      focusAfterOpen: false,
    }).setHTML(popupHTML);

    marker.setPopup(popup);

    popup.on('open', () => {
      const button = document.getElementById('visit-btn');
      if (button) {
        button.addEventListener('click', () => this.visitEst(mark.auth0Id));
      }
    });

    console.log(mark.auth0Id);
  }

  visitEst(establishmentID: string) {
    console.log('Navigating to establishment:', establishmentID);
    this.router.navigate([`/establishment/${establishmentID}`]);
  }

  removeAllMarkers(): void {
    this.markers.forEach((m) => m.marker.remove());
    this.markers = [];
  }

  checkZoomLevel(): boolean {
    if (this.map) {
      const zoom = this.map.getZoom();
      if (zoom <= 15) {
        console.log(zoom);

        this.removeAllMarkers();
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  localizeTags(tags: string[]): string[] {
    return tags.map((tag) => this.translate.instant(`TAGS.${tag}`));
  }
}
