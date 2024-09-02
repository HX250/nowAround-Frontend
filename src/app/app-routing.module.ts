import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/Utils/landing-page/landing-page.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { authGuard } from './services/guards/authGuards/auth.guard';
import { guestGuard } from './services/guards/guestGuards/guest.guard';
import { HomePageComponent } from './components/Utils/home-page/home-page.component';
import { LoginPageComponent } from './components/authFeature/login-page/login-page.component';
import { roleGuard } from './services/guards/roleGuards/role.guard';
import { RegisterPageComponent } from './components/authFeature/register-page/register-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [authGuard] },
  { path: 'homepage', component: HomePageComponent, canActivate: [guestGuard] },
  {
    path: 'loginpage',
    component: LoginPageComponent,
    canActivate: [roleGuard],
  },
  {
    path: 'registerpage',
    component: RegisterPageComponent,
    canActivate: [roleGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [LandingPageComponent, HomePageComponent];
