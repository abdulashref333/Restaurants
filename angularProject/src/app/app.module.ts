import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResturantsListComponent } from './resturants-list/resturants-list.component';
import { HttpClientModule } from '@angular/common/http';

//Auth
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    ResturantsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
