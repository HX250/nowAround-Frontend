import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable, switchMap } from 'rxjs';
import { adminReq } from 'src/app/models/admin-est-req.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  getAllPendingEstablishments(): Observable<adminReq> {
    return this.setHeaders().pipe(
      switchMap((headers) => {
        return this.http.get<adminReq>(
          `${environment.API_END_POINT}Establishment/pending`,
          { headers, responseType: 'json' },
        );
      }),
    );
  }

  proccessEstablishment(buttonText: string, estID: number): Observable<any> {
    return this.setHeaders().pipe(
      switchMap((headers) => {
        return this.http.put<any>(
          `${environment.API_END_POINT}${estID}/pending/${buttonText}`,
          { headers, responseType: 'json' },
        );
      }),
    );
  }

  private setHeaders(): Observable<HttpHeaders> {
    return this.auth.getAccessTokenSilently().pipe(
      map((token) => {
        return new HttpHeaders().set('Authorization', `${token}`);
      }),
    );
  }
}
