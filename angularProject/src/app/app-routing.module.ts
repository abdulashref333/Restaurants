import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ResturantsListComponent} from './resturants-list/resturants-list.component';

const routes: Routes = [
  {
		path: "auth",
		loadChildren: () =>
			import("./auth/auth.module").then(
				(m) => m.AuthModule
			),
	},
  {path:'resturants', component: ResturantsListComponent},
  {path:'', component: ResturantsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
