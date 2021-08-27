import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {  Observable, of } from 'rxjs';
;

const API_URL = environment.authenticationServiceUrl;
const API_TOKEN = 'authTokenKey';


@Injectable({
  providedIn: 'root'
})
export class AuthService{

	// Authentication/Authorization
  constructor(
    private http: HttpClient,
  ){}

  authorization() {
		const token = JSON.parse(String(localStorage.getItem('authTokenKey')));

		if (token) {
      let headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Accept','application/json')
        .set('authorization','Bearer ' + token.token)
			return headers;
		} else {
      let headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Accept','application/json')
			return headers
		}
	}

	login(email: string, password: string): Observable<any> {
		let credential;
		if (this.isEmail(email)) {
			credential = { email: email, password };
			return this.http.post<any>(`${API_URL}/users/login`, credential).pipe(
        tap(res => {
          localStorage.setItem('authTokenKey', JSON.stringify({token: res.token, userId:res.user._id}))
        })
			)
		}
    return of([]);
	}

  signUp(user:any){
    this.http.post<any>(`${API_URL}/users/signup`, user).subscribe(res => console.log(res.result));
  }

	logOut(): void {
		localStorage.removeItem(API_TOKEN);
	}

	get userId() {
		const userTokenStr = String(localStorage.getItem(API_TOKEN));
		const userToken = JSON.parse(userTokenStr);;
		return userToken && userToken.userId ? userToken.userId : '';
	}

	isEmail(value:string): boolean {
		const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return !!reg.test(value);
	}
}
