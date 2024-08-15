import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/Utils/landing-page/landing-page.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { roleGuard } from './services/guards/roleGuards/role.guard';
import { RoleSelectionPageComponent } from './components/userFeature/role-selection-page/role-selection-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'choose-account',
    component: RoleSelectionPageComponent,
    canActivate: [roleGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [LandingPageComponent];
