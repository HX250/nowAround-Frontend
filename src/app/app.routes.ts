import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/notFoundFeature/not-found.component';
import { LandingFeatureComponent } from './features/landingFeature/landing-feature.component';
import { authGuard } from './core/guards/authGuard/auth.guard';
import { adminGuard } from './core/guards/adminGuard/admin.guard';

export const routes: Routes = [
  { path: '', component: LandingFeatureComponent },
  {
    path: 'home-page',
    loadChildren: () =>
      import('./features/home-page/home-routing.module').then(
        (mod) => mod.homeRoutingModule,
      ),
  },
  {
    path: 'user-account',
    loadChildren: () =>
      import('./features/userFeature/user-routing.module').then(
        (mod) => mod.userRoutingModule,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'admin-page',
    loadChildren: () =>
      import('./features/adminFeature/admin-routing.module').then(
        (mod) => mod.adminRoutingModule,
      ),
    canActivate: [adminGuard],
  },
  {
    path: 'establishment-register',
    loadChildren: () =>
      import(
        './features/establishmentFeature/establishment-routing.module'
      ).then((mod) => mod.establishmentRoutingModule),
  },
  { path: '**', component: NotFoundComponent },
];
