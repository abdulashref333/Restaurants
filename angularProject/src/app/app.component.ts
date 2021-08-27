import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn!:boolean;
  constructor(
    private authService:AuthService,
  ){

  }

  ngOnInit(){
    this.isLoggedIn = this.authService.userId ? true:false;
  }

  logOut(){
    this.authService.logOut();
    this.isLoggedIn = false;
    location.reload();
  }
}
