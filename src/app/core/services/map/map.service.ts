import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { pins } from '../../../features/mapFeature/models/pins.model';
import { marker } from '../../../features/mapFeature/models/marker.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}
  filterParams = {
    name: '',
    byPriceRange: '',
    categoryName: '',
    tagNames: [] as string[],
  };

  getEstablishmentsInArea(pins: pins): Observable<marker[]> {
    const encodedTags = this.filterParams.tagNames.join('%2C%20');

    const url =
      `${environment.API_END_POINT}Establishment/search-area` +
      `?northWestLat=${pins.northWest.lat}` +
      `&northWestLong=${pins.northWest.lng}` +
      `&southEastLat=${pins.southEast.lat}` +
      `&southEastLong=${pins.southEast.lng}` +
      `&name=${this.filterParams.name || ''}` +
      `&priceCategory=${this.filterParams.byPriceRange || ''}` +
      `&categoryName=${this.filterParams.categoryName || ''}` +
      `&tagNames=${encodedTags}`;

    return this.http.get<marker[]>(url);
  }
}
