import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstablishmentFormComponent } from './establishment-form.component';

const routes: Routes = [
  {
    path: '',
    component: EstablishmentFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class establishmentRoutingModule {}
