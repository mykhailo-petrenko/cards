import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, RegistrationComponent, ProfileComponent } from './auth';
import { RandomCardComponent } from './learn/pages/random-card/random-card.component';
import { ListComponent } from './crud/pages/list/list.component';
import { EditComponent } from './crud/pages/edit/edit.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'cards/edit/:cardId',
    component: EditComponent
  },
  {
    path: 'cards/create',
    component: EditComponent
  },
  {
    path: 'cards/page/:page',
    component: ListComponent
  },
  {
    path: 'cards',
    redirectTo: 'cards/page/0'
  },
  {
    path: '',
    component: RandomCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
})
export class AppRoutingModule { }
