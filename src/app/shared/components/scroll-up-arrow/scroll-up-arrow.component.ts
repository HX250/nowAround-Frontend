import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-up-arrow',
  standalone: true,
  imports: [NgIf],
  templateUrl: './scroll-up-arrow.component.html',
  styleUrl: './scroll-up-arrow.component.css',
})
export class ScrollUpArrowComponent {
  isShow: boolean | undefined;
  topPosToStartShowing = 800;

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
}
