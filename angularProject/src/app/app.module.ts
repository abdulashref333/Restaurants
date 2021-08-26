import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResturantsListComponent } from './resturants-list/resturants-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Auth
import { AuthService } from './services/auth.service';
import { ResturantService } from './services/resturant.service';
import { CreateNewResturantComponent } from './create-new-resturant/create-new-resturant.component';
import { AuthGuard  } from './guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    ResturantsListComponent,
    CreateNewResturantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    AuthService,
    AuthGuard,
    ResturantService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
