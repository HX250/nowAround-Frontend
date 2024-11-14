import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompleteFormData } from '../../../features/establishmentFeature/models/complete-form-data.model';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EstabilishmentService {
  constructor(private http: HttpClient) {}

  registerEstablishment(
    completeFormData: CompleteFormData
  ): Observable<HttpResponse<any>> {
    completeFormData.establishmentInfo.address =
      completeFormData.establishmentInfo.address.replace(/\//g, '-');
    return this.http.post<any>(
      `${environment.API_END_POINT}/Establishment`,
      completeFormData,
      {
        observe: 'response',
      }
    );
  }
}
