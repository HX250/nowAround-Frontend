import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-arrow-up',
  templateUrl: './scroll-arrow-up.component.html',
  styleUrls: ['./scroll-arrow-up.component.css'],
})
export class ScrollArrowUpComponent {
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
