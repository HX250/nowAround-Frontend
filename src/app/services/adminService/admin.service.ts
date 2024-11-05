import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable, switchMap } from 'rxjs';
import { Establishment } from 'src/app/models/admin-est.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  getAllPendingEstablishments(): Observable<Establishment[]> {
    return this.setHeaders().pipe(
      switchMap((headers) => {
        return this.http.get<Establishment[]>(
          `${environment.API_END_POINT}Establishment/pending`,
          { headers, responseType: 'json' },
        );
      }),
    );
  }
  proccessEstablishment(buttonText: string, estID: string): Observable<any> {
    const params = new HttpParams()
      .set('auth0Id', estID)
      .set('action', buttonText.toLocaleLowerCase());

    return this.setHeaders().pipe(
      switchMap((headers) => {
        return this.http.put<any>(
          `${environment.API_END_POINT}Establishment/register-status?${params}`,
          {},
          { headers },
        );
      }),
    );
  }

  private setHeaders(): Observable<HttpHeaders> {
    return this.auth.getAccessTokenSilently().pipe(
      map((token) => {
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      }),
    );
  }
}
