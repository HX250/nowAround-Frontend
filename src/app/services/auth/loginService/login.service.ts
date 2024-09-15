import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { url } from 'src/app/api/authApiUrls/url';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  login(loginEmail: string, loginPassword: string): Observable<any> {
    const body = { email: loginEmail, password: loginPassword };

    return this.http
      .post<any>(`${url.API_END_POINT}${url.METHODS.LOGIN}`, body, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.body && response.body.token) {
            this.cookieService.set('jwt', response.body.token);
            this.cookieService.set('role', 'user');
          }
          this.isLoggedIn = true;
          return response;
        }),
        catchError((error: HttpErrorResponse) => {
          const errorData = {
            status: error.status,
            message: error.error ? error.error.message : error.message,
          };

          return throwError(() => new Error(JSON.stringify(errorData)));
        }),
      );
  }
}
