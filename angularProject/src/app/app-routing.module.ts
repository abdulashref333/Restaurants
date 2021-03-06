import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ResturantsListComponent} from './resturants-list/resturants-list.component';
import {CreateNewResturantComponent} from './create-new-resturant/create-new-resturant.component';
import { AuthGuard } from './guards/auth.guard';
import { ResturantDetailsComponent } from './resturant-details/resturant-details.component';

const routes: Routes = [
  {
		path: "auth",
		loadChildren: () =>
			import("./auth/auth.module").then(
				(m) => m.AuthModule
			),
	},
  {
    path:'resturants/new',
    component: CreateNewResturantComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'resturants/edit/:id',
    component: CreateNewResturantComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'resturants/:id',
    component: ResturantDetailsComponent,
  },
  {path:'resturants', component: ResturantsListComponent},
  {path:'', component: ResturantsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
