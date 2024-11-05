import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MapComponent, FilterComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  exports: [MapComponent, FilterComponent],
})
export class MapFeatureModule {}
