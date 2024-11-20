import { Component } from '@angular/core';
import { CustomAuthService } from '../../core/services/auth/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ScrollUpArrowComponent } from '../../shared/components/scroll-up-arrow/scroll-up-arrow.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RoleSelectionComponent } from './role-selection/role-selection.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-landing-feature',
  standalone: true,
  imports: [
    ScrollUpArrowComponent,
    TranslateModule,
    CommonModule,
    RoleSelectionComponent,
  ],
  templateUrl: './landing-feature.component.html',
  styleUrl: './landing-feature.component.css',
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
export class LandingFeatureComponent {
  currentIndex: number = 0;
  shownRoleWindow: boolean = false;
  images: string[] = [
    'url(landing/heroSection/landingPage-city.jpg)',
    'url(landing/heroSection/landingPage-coffee.jpg)',
    'url(landing/heroSection/landingPage-nature.jpg)',
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
