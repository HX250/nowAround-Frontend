import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

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
export class LandingPageComponent implements OnInit {
  currentIndex: number = 0;
  shownRoleWindow: boolean = false;

  images: string[] = [
    'url(/assets/landing-page/landingPage-city.jpg)',
    'url(/assets/landing-page/landingPage-nature.jpg)',
    'url(/assets/landing-page/landingPage-coffee.jpg)',
  ];

  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel(): void {
    setInterval(() => {
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
}
