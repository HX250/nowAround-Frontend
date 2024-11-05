import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { adminReq } from 'src/app/models/admin-est-req.model';
import { pins } from 'src/app/models/pins.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}
  getEstablishmentsInArea(pins: pins): Observable<any> {
    const params = new HttpParams()
      .set('northWestLat', pins.northWest.lat.toString())
      .set('northWestLong', pins.northWest.lng.toString())
      .set('southEastLat', pins.southEast.lat.toString())
      .set('southEastLong', pins.southEast.lng.toString());

    return this.http.get<any>(
      `${environment.API_END_POINT}Establishment/search-area`,
      {
        params,
      },
    );
  }
}
