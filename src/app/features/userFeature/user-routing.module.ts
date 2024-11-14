import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserAboutComponent } from './user-about/user-about.component';
import { UserNewsComponent } from './user-news/user-news.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'news', pathMatch: 'full' },
      { path: 'about', component: UserAboutComponent },
      { path: 'news', component: UserNewsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class userRoutingModule {}
