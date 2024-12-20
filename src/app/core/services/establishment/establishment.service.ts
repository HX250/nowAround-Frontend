import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { CompleteFormData } from '../../../features/establishmentFeature/models/form/complete-form-data.model';
import { establishmentProfile } from '../../../features/establishmentFeature/models/profile/estProfile.model';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class EstabilishmentService {
  private estProfileSubject = new BehaviorSubject<establishmentProfile | null>(
    null,
  );
  estProfileState$ = this.estProfileSubject.asObservable();

  constructor(
    private http: HttpClient,
    private alert: AlertService,
  ) {}

  setProfile(profile: establishmentProfile) {
    this.estProfileSubject.next(profile);
  }

  getProfile() {
    return this.estProfileSubject.value;
  }

  returnSpecificProfileInfo<T>(
    infoPart: keyof establishmentProfile,
  ): Observable<T | undefined> {
    return this.estProfileState$.pipe(
      map((profile) => (profile ? (profile[infoPart] as T) : undefined)),
    );
  }

  sendReview(
    estId?: string,
    review?: string,
    userId?: string,
  ): Observable<any> {
    const payload = { estId, review, userId };
    return this.http.post('/api/reviews', payload);
  }

  setTestProfile(estId: string): Observable<establishmentProfile | null> {
    return this.http
      .get<establishmentProfile>(
        `http://localhost:3000/getEstablishment?estId=${estId}`,
      )
      .pipe(
        tap((response) => {
          this.estProfileSubject.next(response);
        }),
        catchError((error) => {
          console.log(error);

          this.estProfileSubject.next(null);
          this.alert.showAlert(
            'There has been an error in loading establishment, please try again',
            false,
          );
          return of(null);
        }),
      );
  }

  registerEstablishment(completeFormData: CompleteFormData): Observable<any> {
    completeFormData.establishmentInfo.address =
      completeFormData.establishmentInfo.address.replace(/\//g, '-');
    return this.http.post<any>(
      `${environment.API_END_POINT}/Establishment`,
      completeFormData,
      {
        observe: 'response',
      },
    );
  }
}
