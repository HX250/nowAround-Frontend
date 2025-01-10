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
      minZoom: 14,
      maxZoom: 20,
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
          (!this.lastBounds ||
            !this.lastBounds.contains(bounds.getNorthWest()) ||
            !this.lastBounds.contains(bounds.getSouthEast())) &&
          this.checkZoomLevel()
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
    <div class="w-fit h-fit bg-ang-white flex gap-2 flex-col p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">${mark.name}</h3>
      <p>${mark.descritpion}</p>
      <p>${localizedTags}</p>
      <p>${mark.priceCategory}</p>
      <button class="bg-ang-orange text-ang-white text-lg rounded-md px-4 py-2 hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300" id="visit-btn">
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
