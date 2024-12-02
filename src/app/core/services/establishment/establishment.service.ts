import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompleteFormData } from '../../../features/establishmentFeature/models/form/complete-form-data.model';
import { environment } from '../../../../environments/environment.prod';
import { establishmentProfile } from '../../../features/establishmentFeature/models/profile/estProfile.model';

@Injectable({
  providedIn: 'root',
})
export class EstabilishmentService {
  private estProfileSubject = new BehaviorSubject<
    establishmentProfile | undefined
  >(undefined);
  estProfileState$ = this.estProfileSubject.asObservable();

  constructor(private http: HttpClient) {}

  setProfile(profile: establishmentProfile) {
    this.estProfileSubject.next(profile);
  }

  getProfile() {
    return this.estProfileSubject.value;
  }

  setTestProfile() {
    const testProfile: establishmentProfile = {
      genericInformation: {
        authId: 'user123',
        name: 'Test Establishment',
        photo: 'https://example.com/profile-photo.jpg',
        review: {
          1: 10,
          2: 5,
          3: 12,
          4: 20,
          5: 30,
        },
        tags: ['Food & Drink', 'Casual Dining'],
        categories: ['Restaurant', 'Cafe', 'Bar'],
        priceRange: '$$',
        cousine: ['Italian', 'Mediterranean'],
      },
      posts: [
        {
          headline: 'Exciting New Menu!',
          date: new Date('2024-11-20'),
          body: 'We are introducing a variety of new dishes! Come try them today.',
          interests: 150,
          photo: 'https://example.com/post-photo.jpg',
        },
        {
          headline: 'Live Music Event!',
          date: new Date('2024-12-01'),
          body: "Join us for a night of live music and great food. Don't miss out!",
          interests: 120,
        },
        {
          headline: 'Holiday Special Offer!',
          date: new Date('2024-12-10'),
          body: 'Celebrate the holidays with us! Enjoy a special menu and great deals.',
          interests: 200,
          photo: 'https://example.com/holiday-special-photo.jpg',
        },
      ],
      tabs: [
        {
          title: 'Special Offer',
          description:
            'Get 20% off on your first order when you mention this offer.',
          price: '$10 - $50',
          photo: 'https://example.com/tab-photo.jpg',
        },
        {
          title: 'Classic Burger',
          description:
            'A juicy beef patty served with lettuce, tomato, and our signature sauce.',
          price: '$8.99',
          photo: 'https://example.com/burger.jpg',
        },
        {
          title: 'Margherita Pizza',
          description:
            'Traditional Italian pizza with fresh basil, mozzarella, and tomato sauce.',
          price: '$12.00',
          photo: 'https://example.com/pasta-alfredo.jpg',
        },
        {
          title: 'Crispy Chicken Sandwich',
          description:
            'Crispy fried chicken breast with pickles and mayo on a toasted bun.',
          price: '$9.50',
          photo: 'https://example.com/chicken-sandwich.jpg',
        },
        {
          title: 'House Salad',
          description:
            'A refreshing mix of greens, cucumbers, cherry tomatoes, and a light vinaigrette.',
          price: '$7.00',
          photo: 'https://example.com/pasta-alfredo.jpg',
        },
        {
          title: 'Pasta Alfredo',
          description:
            'Creamy Alfredo sauce with your choice of chicken or shrimp, served over fettuccine.',
          price: '$15.00 - $18.00',
          photo: 'https://example.com/pasta-alfredo.jpg',
        },
      ],

      estInfo: [
        {
          address: '123 Test Street',
          city: 'Test City',
          postal: '12345',
          socials: [
            'https://facebook.com/testestablishment',
            'https://twitter.com/testest',
          ],
          openingHours: true,
        },
      ],
    };
    this.setProfile(testProfile);
  }

  registerEstablishment(
    completeFormData: CompleteFormData,
  ): Observable<HttpResponse<any>> {
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
