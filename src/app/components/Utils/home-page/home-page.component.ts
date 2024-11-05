import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  isFilterWindowShown: boolean = true;
  updateWindowBool($event: boolean) {
    this.isFilterWindowShown = !this.isFilterWindowShown;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
