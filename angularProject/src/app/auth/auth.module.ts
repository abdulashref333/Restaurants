import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
		children: [
			{
				path: '',
				redirectTo: 'login',
				pathMatch: 'full'
			},
			{
				path: 'login',
				component: LoginComponent,
				data: { returnUrl: window.location.pathname }
			},

		]
	}
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
		RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers:[
    AuthService
  ]

})
export class AuthModule { }
