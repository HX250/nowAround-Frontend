import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/Utils/landing-page/landing-page.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { authGuard } from './services/guards/authGuards/auth.guard';
import { guestGuard } from './services/guards/guestGuards/guest.guard';
import { HomePageComponent } from './components/Utils/home-page/home-page.component';
import { UserAccountComponent } from './components/userFeature/user-account/user-account.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { EstabilishmentLoginComponent } from './components/estabilishmentFeature/estabilishment-login/estabilishment-login.component';
import { EstablishmentRegisterFormComponent } from './components/estabilishmentFeature/establishment-register-form/establishment-register-form.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [authGuard] },
  { path: 'homepage', component: HomePageComponent, canActivate: [guestGuard] },
  {
    path: 'user-account',
    component: UserAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'establishment-register',
    component: EstablishmentRegisterFormComponent,
  },
  {
    path: 'establishment-login',
    component: EstabilishmentLoginComponent,
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [
  LandingPageComponent,
  HomePageComponent,
  EstablishmentRegisterFormComponent,
  EstabilishmentLoginComponent,
];
