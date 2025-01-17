import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstablishmentFormComponent } from './establishmentForm/establishment-form.component';
import { ProfileComponent } from './establishmentProfile/profile.component';
import { PostsComponent } from './establishmentProfile/posts/posts.component';
import { TabsComponent } from './establishmentProfile/tabs/tabs.component';
import { ReviewsComponent } from './establishmentProfile/reviews/reviews.component';
import { EventsComponent } from './establishmentProfile/events/events.component';
import { NotFoundComponent } from '../notFoundFeature/not-found.component';

const routes: Routes = [
  {
    path: 'register-form',
    component: EstablishmentFormComponent,
  },
  {
    path: ':id',
    component: ProfileComponent,

    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'tabs',
        component: TabsComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class establishmentRoutingModule {}
