import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstablishmentFormComponent } from './establishmentForm/establishment-form.component';
import { ProfileComponent } from './establishmentProfile/profile.component';
import { PostsComponent } from './establishmentProfile/posts/posts.component';
import { TabsComponent } from './establishmentProfile/tabs/tabs.component';
import { ReviewsComponent } from './establishmentProfile/reviews/reviews.component';

const routes: Routes = [
  {
    path: '',
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
        path: 'reviews',
        component: ReviewsComponent,
      },
    ],
  },
  {
    path: 'register-form',
    component: EstablishmentFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class establishmentRoutingModule {}
