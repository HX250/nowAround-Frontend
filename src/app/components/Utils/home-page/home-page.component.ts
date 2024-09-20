import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import * as mapboxgl from 'mapbox-gl';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 48.716385;
  lng: number = 21.261074;

  token: string = '';

  constructor(
    private auth: AuthService,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });
  }

  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin },
    });
    this.cookieService.deleteAll();
  }

  getToken(): void {
    this.auth.getAccessTokenSilently({ detailedResponse: true }).subscribe({
      next: (response) => {
        console.log(response.access_token);
        this.token = response.access_token;

        this.cookieService.set('tkn', this.token);
        this.cookieService.set('role', 'user');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
