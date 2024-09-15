import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { url } from 'src/app/api/authApiUrls/url';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(
    registerFirstName: string,
    registerLastName: string,
    email: string,
    password: string,
    repeatPassword: string,
  ) {
    const body = {
      firstName: registerFirstName,
      lastName: registerLastName,
      email: email,
      password: password,
      repeatPassowrd: repeatPassword,
    };

    return this.http.post<any>(
      `${url.API_END_POINT}${url.METHODS.REGISTER}`,
      body,
    );
  }
}
