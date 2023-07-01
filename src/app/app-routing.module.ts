import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { ROUTES } from './routes.const';

const routes: Routes = [
  { path: '', redirectTo: ROUTES.DASHBOARD, pathMatch: 'full' },
  { path: ROUTES.DASHBOARD, component: DashboardComponent },
  { path: ROUTES.DETAIL, component: HeroDetailComponent },
  { path: ROUTES.HEROES, component: HeroesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
