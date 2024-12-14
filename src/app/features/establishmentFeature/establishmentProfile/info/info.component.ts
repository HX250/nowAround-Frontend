import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { locationInfo } from '../../models/profile/estInfo.model';
import { EstabilishmentService } from '../../../../core/services/establishment/establishment.service';
import { CommonModule } from '@angular/common';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../../environments/environment.dev';
import { DaySortPipe } from '../../../../shared/pipe/daySort.pipe';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, DaySortPipe],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent implements OnInit, AfterViewInit {
  @Output() close = new EventEmitter<void>();
  infoList?: locationInfo = undefined;
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v11';
  lat?: number;
  lng?: number;

  constructor(private estServ: EstabilishmentService) {}

  ngOnInit(): void {
    this.getProfileData();
    this.assignLocation();
  }

  getProfileData() {
    this.estServ
      .returnSpecificProfileInfo<locationInfo>('locationInfo')
      .subscribe((Response) => {
        this.infoList = Response;
      });
  }
  assignLocation() {
    if (this.infoList) {
      this.lat = this.infoList.lat;
      this.lng = this.infoList.long;
    }
  }

  closeModal() {
    this.close.emit();
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.MAPBOX_TOKEN,
      container: 'map',
      style: this.style,
      zoom: 16,
      attributionControl: false,
      center: [this.lng!, this.lat!],
    });

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
  `;

    const marker = new mapboxgl.Marker(markerElement)
      .setLngLat([this.lng!, this.lat!])
      .addTo(this.map!);
  }
}
