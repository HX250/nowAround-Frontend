import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthService } from '@auth0/auth0-angular';
import { CustomAuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('slideAnimation', [
      state('previous', style({ transform: 'translateX(-100%)' })),
      state('current', style({ transform: 'translateX(0)' })),
      state('next', style({ transform: 'translateX(100%)' })),
      transition('previous => current, current => next', [
        animate('0.8s ease-out'),
      ]),
      transition('next => current, current => previous', [
        animate('0.8s ease-out'),
      ]),
    ]),
  ],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  currentIndex: number = 0;
  shownRoleWindow: boolean = false;
  images: string[] = [
    'url(/assets/landing-page/landingPage-city.jpg)',
    'url(/assets/landing-page/landingPage-nature.jpg)',
    'url(/assets/landing-page/landingPage-coffee.jpg)',
  ];

  constructor(private authServ: CustomAuthService) {}

  private carouselInterval: any;

  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000);
  }

  showRoleWindow() {
    this.shownRoleWindow = !this.shownRoleWindow;
  }

  updateWindowBool(updatedWindowShown: boolean) {
    this.shownRoleWindow = updatedWindowShown;
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  getState(index: number): string {
    if (index === this.currentIndex) {
      return 'current';
    } else if (
      index ===
      (this.currentIndex - 1 + this.images.length) % this.images.length
    ) {
      return 'previous';
    } else if (index === (this.currentIndex + 1) % this.images.length) {
      return 'next';
    } else {
      return '';
    }
  }

  loginWithRedirect(): void {
    this.authServ.loginWithRedirect();
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
}
