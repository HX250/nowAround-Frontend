import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/Utils/landing-page/landing-page.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { HomePageComponent } from './components/Utils/home-page/home-page.component';
import { UserAccountComponent } from './components/userFeature/user-account/user-account.component';
import { EstabilishmentLoginComponent } from './components/estabilishmentFeature/estabilishment-login/estabilishment-login.component';
import { EstablishmentRegisterFormComponent } from './components/estabilishmentFeature/establishment-register-form/establishment-register-form.component';
import { AdminPageComponent } from './components/adminFeature/admin-page/admin-page.component';
import { adminGuard } from './services/guards/adminGuard/admin.guard';
import { loginGuard } from './services/guards/loginGuard/login.guard';
import { UserAccountAboutComponent } from './components/userFeature/user-account-about/user-account-about.component';
import { UserAccountNewsComponent } from './components/userFeature/user-account-news/user-account-news.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'user-account',
    component: UserAccountComponent,
    canActivate: [loginGuard],
    children: [
      { path: '', component: UserAccountNewsComponent },
      { path: 'about', component: UserAccountAboutComponent },
    ],
  },
  {
    path: 'establishment-register',
    component: EstablishmentRegisterFormComponent,
  },
  {
    path: 'establishment-login',
    component: EstabilishmentLoginComponent,
  },
  {
    path: 'admin-page',
    component: AdminPageComponent,
    canActivate: [adminGuard],
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
