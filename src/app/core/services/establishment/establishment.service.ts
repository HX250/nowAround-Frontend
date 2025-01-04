import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { CompleteFormData } from '../../../features/establishmentFeature/models/form/complete-form-data.model';
import { establishmentProfile } from '../../../features/establishmentFeature/models/profile/estProfile.model';
import { AlertService } from '../alert/alert.service';
import { environment } from '../../../../environments/environment.dev';
import {
  Menu,
  MenuItem,
} from '../../../features/establishmentFeature/models/profile/menu.model';
import { EventCategory } from '../../../features/establishmentFeature/models/profile/events.model';

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

  testEstProfile: establishmentProfile = {
    auth0Id: 'auth0|123456789',
    genericInfo: {
      photo: 'https://example.com/photo.jpg',
      name: 'The Gourmet Spot',
      tags: ['cozy', 'family-friendly', 'romantic'],
      categories: ['Italian', 'Mediterranean'],
      priceRange: '$$',
      cousine: ['Pasta', 'Pizza', 'Seafood'],
    },
    posts: [
      {
        imageUrl: 'https://example.com/post1.jpg',
        headline: 'Grand Opening!',
        createdAt: new Date('2023-06-15'),
        body: 'Come celebrate our grand opening with us. Enjoy 20% off all menu items!',
        userLikes: ['auth0|user1', 'auth0|user2'],
      },
      {
        headline: 'Live Music Every Friday',
        createdAt: new Date('2023-06-20'),
        body: 'Join us every Friday for live performances by local artists.',
        userLikes: ['auth0|user3'],
      },
    ],
    menus: [
      {
        name: 'Dinner Menu',
        menuItems: [
          {
            name: 'Margherita Pizza',
            url: 'https://example.com/margherita',
            description:
              'Classic pizza with fresh mozzarella, basil, and tomato sauce.',
            price: '$12.99',
          },
          {
            name: 'Spaghetti Carbonara',
            url: 'https://example.com/carbonara',
            description:
              'Creamy pasta with pancetta, egg, and parmesan cheese.',
            price: '$14.99',
          },
        ],
      },
      {
        name: 'Drinks Menu',
        menuItems: [
          {
            name: 'Classic Mojito',
            url: 'https://example.com/mojito',
            description: 'Refreshing mint cocktail with lime and soda.',
            price: '$7.50',
          },
          {
            name: 'Red Wine',
            url: 'https://example.com/redwine',
            description: 'A selection of our finest red wines.',
            price: '$8.00',
          },
        ],
      },
    ],
    events: [
      {
        imageUrl: 'https://example.com/wine-tasting.jpg', // Optional, added for illustration
        title: 'Wine Tasting Night',
        body: 'Explore a curated selection of wines with our sommelier.',
        dateOfEvent: new Date('2024-01-15'),
        interests: ['Wine', 'Tasting', 'Gourmet'],
        price: 50, // Assumed price
        location: 'The Gourmet Spot, Main Hall',
        maxParticipants: '50', // Assumed max participants
        eventDuration: 3, // Assumed duration in hours
        eventCategory: EventCategory.Food,
      },
      {
        imageUrl: 'https://example.com/cooking-workshop.jpg', // Optional, added for illustration
        title: 'Cooking Workshop',
        body: 'Learn to cook authentic Italian dishes with our head chef.',
        dateOfEvent: new Date('2024-02-10'),
        interests: ['Cooking', 'Italian Cuisine', 'Hands-On Experience'],
        price: 75, // Assumed price
        location: 'The Gourmet Spot, Kitchen Studio',
        maxParticipants: '20', // Assumed max participants
        eventDuration: 4, // Assumed duration in hours
        eventCategory: EventCategory.Food,
      },
    ],
    locationInfo: {
      address: '123 Culinary Avenue, Foodie City, FC 98765',
      businessHours: {
        monday: '12:00 PM - 10:00 PM',
        tuesday: '12:00 PM - 10:00 PM',
        wednesday: '12:00 PM - 10:00 PM',
        thursday: '12:00 PM - 11:00 PM',
        friday: '12:00 PM - 11:30 PM',
        saturday: '11:00 AM - 11:30 PM',
        sunday: '11:00 AM - 9:30 PM',
      },
      long: -122.4194,
      lat: 37.7749,
    },
    ratingStatistic: {
      oneStar: 2,
      twoStar: 5,
      threeStars: 15,
      fourStars: 50,
      fiveStars: 120,
      reviews: [
        {
          userAuth0Id: 'auth0|reviewer1',
          fullname: 'John Doe',
          rating: 5,
          body: 'Amazing food and great ambiance!',
          createdAt: new Date('2023-12-15'),
        },
        {
          userAuth0Id: 'auth0|reviewer2',
          fullname: 'Jane Smith',
          rating: 4,
          body: 'Loved the food but the service was a bit slow.',
          createdAt: new Date('2023-11-20'),
        },
      ],
    },
  };

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

  setTestProfile(estId: string): Observable<establishmentProfile | null> {
    return this.http
      .get<establishmentProfile>(
        `${environment.API_END_POINT}Establishent/profile/${estId}`,
      )
      .pipe(
        tap((response) => {
          console.log(response);

          this.estProfileSubject.next(response);
        }),
        catchError((error) => {
          console.log(error);
          this.estProfileSubject.next(null);
          this.estProfileSubject.next(this.testEstProfile);
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
    return this.http.post('http://localhost:3000/uploadPost', formData).pipe(
      map((Response) => {
        console.log(Response);
      }),
    );
  }
  /**
   * ! END OF POST
   */

  /*
   * Menu specific calls
   */

  addNewMenu(menuForm?: Menu[]): Observable<any> {
    console.log(this.estProfileSubject.value?.auth0Id);
    return this.http
      .put<any>('http://localhost:3000/addNewMenuItem', menuForm)
      .pipe(
        map((Response) => {
          this.alert.showAlert('Menu has been updated', true);
          console.log(Response);

          return true;
        }),
        catchError((error) => {
          console.log(error);
          this.alert.showAlert(
            'There has been an error in uploading the mnenu, please try again',
            false,
          );
          return of(null);
        }),
      );
  }

  removeMenuItem(menuName: string, tab?: MenuItem): Observable<any> {
    const estId = this.estProfileSubject.value?.auth0Id;
    const payload = { estId, menuName, tab };

    return this.http
      .delete<any>('http://localhost:3000/removeMenuItem', {
        body: payload,
      })
      .pipe(
        map((Response) => {
          this.alert.showAlert('Menu has been updated', true);
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
    return this.http.post('http://localhost:3000/uploadEvent', eventForm).pipe(
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
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:3000/uploadImage', formData).pipe(
      map((Response) => {
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
}
