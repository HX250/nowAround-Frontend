import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompleteFormData } from 'src/app/models/complete-form-data.model';

@Injectable({
  providedIn: 'root',
})
export class EstabilishmentService {
  apiurl: string = 'http://localhost:3000/estService';

  constructor(private http: HttpClient) {}

  registerEstablishment(
    completeFormData: CompleteFormData,
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiurl, completeFormData, {
      observe: 'response',
    });
  }
}
