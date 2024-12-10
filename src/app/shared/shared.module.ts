import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DaySortPipe } from './pipe/daySort.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
