import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/notFoundFeature/not-found.component';
import { LandingFeatureComponent } from './features/landingFeature/landing-feature.component';
import { authGuard } from './core/guards/authGuard/auth.guard';
import { adminGuard } from './core/guards/adminGuard/admin.guard';
import { roleGuard } from './core/guards/roleGuard/role.guard';

export const routes: Routes = [
  { path: '', component: LandingFeatureComponent, canActivate: [roleGuard] },
  {
    path: 'home-page',
    loadChildren: () =>
      import('./features/home-page/home-routing.module').then(
        (mod) => mod.homeRoutingModule,
      ),
    canActivate: [roleGuard],
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
    path: 'establishment',
    loadChildren: () =>
      import(
        './features/establishmentFeature/establishment-routing.module'
      ).then((mod) => mod.establishmentRoutingModule),
  },
  { path: '**', component: NotFoundComponent },
];
