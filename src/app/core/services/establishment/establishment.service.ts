import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { CompleteFormData } from '../../../features/establishmentFeature/models/form/complete-form-data.model';
import { establishmentProfile } from '../../../features/establishmentFeature/models/profile/estProfile.model';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../../environments/environment.dev';
import { Menu } from '../../../features/establishmentFeature/models/profile/menu.model';

@Injectable({
  providedIn: 'root',
})
export class EstabilishmentService {
  private estProfileSubject = new BehaviorSubject<establishmentProfile | null>(
    null,
  );
  estProfileState$ = this.estProfileSubject.asObservable();
  editMenu = signal(false);
  addPost = signal(false);
  addEvent = signal(false);

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

  /*
   * Profile specific calls
   */
  returnSpecificProfileInfo<T>(
    infoPart: keyof establishmentProfile,
  ): Observable<T | undefined> {
    return this.estProfileState$.pipe(
      map((profile) => (profile ? (profile[infoPart] as T) : undefined)),
    );
  }

  changeSpecificProfileInfo<T>(
    infoPart: keyof establishmentProfile,
    newValue: T,
  ): Observable<establishmentProfile | undefined> {
    return this.estProfileState$.pipe(
      map((profile) => {
        if (profile) {
          const updatedProfile = { ...profile, [infoPart]: newValue };
          return updatedProfile;
        }
        return undefined;
      }),
    );
  }

  setTestProfile(estId: string): Observable<establishmentProfile | any> {
    return this.http
      .get<establishmentProfile>(
        `${environment.API_END_POINT}Establishment/profile/${estId}`,
      )
      .pipe(
        map((response) => {
          console.log(response);
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
  /**
   * !END OF PROFILE
   */

  /*
   * Review specific calls
   */
  sendReview(
    estId?: string,
    review?: string,
    userId?: string,
  ): Observable<any> {
    const payload = { estId, review, userId };
    return this.http.post('/api/reviews', payload);
  }
  /**
   * ! END OF REVIEW
   */

  /*
   * Post specific calls
   */
  uploadPost(formData: FormData): Observable<any> {
    return this.http.post(`${environment.API_END_POINT}Post`, formData).pipe(
      map((Response) => {
        this.alert.showAlert('Post created succsefully', true);
        this.changeSpecificProfileInfo('posts', Response);
      }),
      catchError((error) => {
        console.log(error);
        this.alert.showAlert(
          'There has been an error in uploading the post, please try again',
          false,
        );
        return of(null);
      }),
    );
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${environment.API_END_POINT}Post/${postId}`).pipe(
      map((Response) => {
        this.alert.showAlert('Post deleted succsefully', true);
        console.log(Response);
      }),
      catchError((error) => {
        console.log(error);
        this.alert.showAlert(
          'There has been an error in deleting the post, please try again',
          false,
        );
        return of(null);
      }),
    );
  }

  /**
   * ! END OF POST
   */

  /*
   * Menu specific calls
   */

  addNewMenu(menuForm?: Menu): Observable<any> {
    return this.http
      .post<any>(`${environment.API_END_POINT}Establishment/menu`, menuForm)
      .pipe(
        map((Response) => {
          this.alert.showAlert('Menu has been updated', true);
          console.log(Response);

          return true;
        }),
        catchError((error) => {
          console.log(error);
          this.alert.showAlert(
            'There has been an error in uploading the menu, please try again',
            false,
          );
          return of(null);
        }),
      );
  }

  updateMenuItems(menu: Menu) {
    return this.http
      .put<any>(`${environment.API_END_POINT}Establishment/menu`, menu)
      .pipe(
        map((Response) => {
          this.alert.showAlert('Menu has been updated', true);
          console.log(Response);
          return true;
        }),
        catchError((error) => {
          console.log(error);
          this.alert.showAlert(
            'There has been an error in uploading the menu, please try again',
            false,
          );
          return of(null);
        }),
      );
  }

  removeMenuCategory(categoryId: string): Observable<any> {
    return this.http
      .delete<any>(
        `${environment.API_END_POINT}Establishment/menu/${categoryId}`,
        {
          body: categoryId,
        },
      )
      .pipe(
        map((Response) => {
          this.alert.showAlert('Menu category has been deleted', true);
          console.log(Response);

          return true;
        }),
        catchError((error) => {
          console.log(error);
          this.alert.showAlert(
            'There has been an error in updating the mnenu, please try again',
            false,
          );
          return of(null);
        }),
      );
  }

  removeMenuItem(tabId: string): Observable<any> {
    return this.http
      .delete<any>(
        `${environment.API_END_POINT}Establishment/menu/item/${tabId}`,
        {
          body: tabId,
        },
      )
      .pipe(
        map((Response) => {
          this.alert.showAlert('Menu item has been updated', true);
          console.log(Response);

          return true;
        }),
        catchError((error) => {
          console.log(error);
          this.alert.showAlert(
            'There has been an error in updating the mnenu, please try again',
            false,
          );
          return of(null);
        }),
      );
  }
  /**
   * !END OF MENU
   */

  /*
   * Event specific calls
   */
  uploadEvent(eventForm: FormData): Observable<any> {
    return this.http.post(`${environment.API_END_POINT}Event`, eventForm).pipe(
      map((Response) => {
        this.alert.showAlert('Event has been added', true);
      }),
      catchError((error) => {
        console.log(error);
        this.alert.showAlert(
          'There has been an error in adding the event, please try again',
          false,
        );
        return of(null);
      }),
    );
  }
  /**
   * ! END OF EVENT
   */
  /*
   * Image specific calls
   */
  //Establishment/menu/item/image/{menuItemId}
  //Establishment/image/
  uploadImage(formData: FormData, where?: string): Observable<any> {
    return this.http
      .put(`${environment.API_END_POINT}/Establishment${where}`, formData)
      .pipe(
        map((Response) => {
          console.log(Response);

          this.alert.showAlert('Image has been uploaded', true);
        }),
        catchError((error) => {
          console.log(error);
          this.alert.showAlert(
            'Image couldnt be uploaded, please try again',
            false,
          );
          return of(null);
        }),
      );
  }
  /**
   * ! END OF IMAGE
   */

  /*
   * Register establishment specific calls
   */
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
  /**
   * ! END OF REGISTER
   */

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      this.alert.showAlert(`${operation} failed, please try again.`, false);
      return of(result);
    };
  }
}
