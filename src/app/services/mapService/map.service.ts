import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pins } from 'src/app/models/pins.model';
import { environment } from 'src/environments/environment.prod';

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
  //
  getEstablishmentsInArea(pins: pins): Observable<any> {
    const params = new HttpParams()
      .set('northWestLat', pins.northWest.lat.toString())
      .set('northWestLong', pins.northWest.lng.toString())
      .set('southEastLat', pins.southEast.lat.toString())
      .set('southEastLong', pins.southEast.lng.toString())
      .set('name', this.filterParams.name)
      .set('priceRange', this.filterParams.byPriceRange)
      .set('categoryName', this.filterParams.categoryName)
      .set('tagNames', this.filterParams.tagNames.join(','));

    return this.http.get<any>(
      `${environment.API_END_POINT}Establishment/search-area`,
      {
        params,
      },
    );
  }
}
