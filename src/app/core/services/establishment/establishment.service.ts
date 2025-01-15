import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { CompleteFormData } from '../../../features/establishmentFeature/models/form/complete-form-data.model';
import { establishmentProfile } from '../../../features/establishmentFeature/models/profile/estProfile.model';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../../environments/environment.dev';
import { Menu } from '../../../features/establishmentFeature/models/profile/menu.model';
import { posts } from '../../../features/establishmentFeature/models/profile/posts.model';
import { updateGenericInfo } from '../../../features/establishmentFeature/models/profile/updateGenericInfo.model';

@Injectable({
  providedIn: 'root',
})
export class EstabilishmentService {
  private estProfileSubject = new BehaviorSubject<establishmentProfile | null>(
    null,
  );
  estProfileState$ = this.estProfileSubject.asObservable();
  addMenu = signal(false);
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

  private changeSpecificProfileInfo<T>(
    infoPart: keyof establishmentProfile,
    newValue: T,
  ): void {
    const currentProfile = this.estProfileSubject.value;
    if (currentProfile) {
      const updatedProfile = {
        ...currentProfile,
        [infoPart]: Array.isArray(currentProfile[infoPart])
          ? [...(currentProfile[infoPart] as T[]), newValue]
          : newValue,
      };
      this.estProfileSubject.next(updatedProfile);
    }
  }
  private updateSpecificMenuCategory<T>(
    infoPart: keyof establishmentProfile,
    categoryId: string,
    newValue: T,
  ): void {
    const currentProfile = this.estProfileSubject.value;
    if (currentProfile) {
      const updatedProfile = {
        ...currentProfile,
        [infoPart]: Array.isArray(currentProfile[infoPart])
          ? (currentProfile[infoPart] as any[]).map((category) =>
              category.id === categoryId
                ? { ...category, ...newValue }
                : category,
            )
          : currentProfile[infoPart],
      };
      this.estProfileSubject.next(updatedProfile);
    }
  }

  private removeSpecificProfileInfo(
    infoPart: keyof establishmentProfile,
    id: string,
    categoryId?: string,
  ): void {
    const currentProfile = this.estProfileSubject.value;

    if (currentProfile) {
      const updatedProfile = {
        ...currentProfile,
        [infoPart]: Array.isArray(currentProfile[infoPart])
          ? (currentProfile[infoPart] as Menu[])
              .map((menu) => {
                if (categoryId && menu.id === categoryId) {
                  return {
                    ...menu,
                    menuItems: menu.menuItems.filter((item) => item.id !== id),
                  };
                }
                return menu;
              })
              .filter((menu) => (categoryId ? true : menu.id !== id))
          : currentProfile[infoPart],
      };

      this.estProfileSubject.next(updatedProfile);
    }
  }

  setTestProfile(estId: string): Observable<establishmentProfile | any> {
    return this.http
      .get<establishmentProfile>(
        `${environment.API_END_POINT}Establishment/profile/${estId}`,
      )
      .pipe(
        map((response) => {
          this.estProfileSubject.next(response);
        }),
        catchError((error) => {
          this.estProfileSubject.next(null);
          this.alert.showAlert('estServErrors-loadEstFalse', false);
          return of(null);
        }),
      );
  }

  updateGenericInfoProfile(form: updateGenericInfo): Observable<any> {
    return this.http
      .put(`${environment.API_END_POINT}Establishment/generic-info`, form)
      .pipe(
        map((response) => {
          window.location.reload();
        }),
        catchError((error) => {
          this.estProfileSubject.next(null);
          this.alert.showAlert('estServErrors-loadEstFalse', false);
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
  uploadPost(formData: FormData): Observable<posts> {
    return this.http
      .post<posts>(`${environment.API_END_POINT}Post`, formData)
      .pipe(
        map((Response) => {
          this.alert.showAlert('estServErrors-addNewPostTrue', true);
          this.changeSpecificProfileInfo('posts', Response);
        }),
        catchError(this.handleError('estServErrors-addNewPostFalse')),
      );
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${environment.API_END_POINT}Post/${postId}`).pipe(
      map((Response) => {
        this.alert.showAlert('estServErrors-deletePostTrue', true);
        this.removeSpecificProfileInfo('posts', postId);
      }),
      catchError(this.handleError('estServErrors-deletePostFalse')),
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
          this.alert.showAlert('estServErrors-addNewMenuTrue', true);

          this.changeSpecificProfileInfo('menus', Response);
          return true;
        }),
        catchError(this.handleError('estServErrors-addNewMenuFalse')),
      );
  }

  updateMenuItems(menu: Menu): Observable<Menu> {
    return this.http
      .put<Menu>(`${environment.API_END_POINT}Establishment/menu`, menu)
      .pipe(
        map((Response) => {
          this.alert.showAlert('estServErrors-updateMenuTrue', true);
          this.updateSpecificMenuCategory('menus', Response.id, Response);

          return Response;
        }),
        catchError(this.handleError('estServErrors-updateMenuFalse')),
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
          this.alert.showAlert('estServErrors-removeMenuCategoryTrue', true);
          this.removeSpecificProfileInfo('menus', categoryId);
          return true;
        }),
        catchError(this.handleError('estServErrors-removeMenuCategoryFalse')),
      );
  }

  removeMenuItem(tabId: string, categoryId: string): Observable<any> {
    return this.http
      .delete<any>(
        `${environment.API_END_POINT}Establishment/menu/item/${tabId}`,
        {
          body: tabId,
        },
      )
      .pipe(
        map((Response) => {
          this.alert.showAlert('estServErrors-removeMenuItemTrue', true);
          this.removeSpecificProfileInfo('menus', tabId, categoryId);
          return true;
        }),
        catchError(this.handleError('estServErrors-removeMenuItemFalse')),
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
      map((response) => {
        this.alert.showAlert('estServErrors-addEventTrue', true);
        this.changeSpecificProfileInfo('events', response);
      }),
      catchError(this.handleError('estServErrors-addEventFalse')),
    );
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http
      .delete(`${environment.API_END_POINT}Event/${eventId}`)
      .pipe(
        map((Response) => {
          this.alert.showAlert('estServErrors-removeEventTrue', true);
          this.removeSpecificProfileInfo('events', eventId);
        }),
        catchError(this.handleError('estServErrors-removeEventFalse')),
      );
  }
  /**
   * ! END OF EVENT
   */
  /*
   * Image specific calls
   */
  uploadImage(formData: FormData, where?: string): Observable<any> {
    return this.http
      .put(`${environment.API_END_POINT}Establishment${where}`, formData)
      .pipe(
        map((Response) => {
          this.alert.showAlert('estServErrors-imageUploadTrue', true);
        }),
        catchError(this.handleError('estServErrors-imageUploadFalse')),
      );
  }
  /**
   * ! END OF IMAGE
   */

  /**
   * Location info specific calls
   */
  updateLocationInfo(updatedData: any): Observable<any> {
    return this.http
      .put(
        `${environment.API_END_POINT}Establishment/location-info`,
        updatedData,
      )
      .pipe(
        map((Response) => {
          window.location.reload();
          this.alert.showAlert('estServErrors-imageUploadTrue', true);
        }),
        catchError(this.handleError('estServErrors-imageUploadFalse')),
      );
  }
  /**
   * ! END OF LOCATION INFO
   */

  /*
   * Register establishment specific calls
   */
  registerEstablishment(completeFormData: CompleteFormData): Observable<any> {
    completeFormData.establishmentInfo.address =
      completeFormData.establishmentInfo.address.replace(/\//g, '-');
    return this.http.post<any>(
      `${environment.API_END_POINT}Establishment`,
      completeFormData,
      {
        observe: 'response',
      },
    );
  }
  /**
   * ! END OF REGISTER
   */

  private handleError(message: string, result?: any) {
    return (error: any): Observable<any> => {
      this.alert.showAlert(`${message}`, false);
      return of(result);
    };
  }
}
