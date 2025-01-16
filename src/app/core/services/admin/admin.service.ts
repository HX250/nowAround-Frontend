import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { adminReq } from '../../../features/adminFeature/models/admin-est-req.model';
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getUserStatistics() {
    return this.http.get<any>(
      `${environment.API_END_POINT}monthlystatistic/2024`,
      { responseType: 'json' },
    );
  }

  getAllPendingEstablishments(): Observable<adminReq[]> {
    return this.http.get<adminReq[]>(
      `${environment.API_END_POINT}Establishment/pending`,
      { responseType: 'json' },
    );
  }
  proccessEstablishment(buttonText: string, estID: string): Observable<any> {
    const params = new HttpParams()
      .set('auth0Id', estID)
      .set('action', buttonText.toLocaleLowerCase());
    return this.http.put<any>(
      `${environment.API_END_POINT}Establishment/register-status?${params}`,
      {},
    );
  }
}
