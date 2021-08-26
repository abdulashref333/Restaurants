import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
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
  ){

  }

  authorization() {
		const token = JSON.parse(String(localStorage.getItem('authTokenKey')));

		if (token) {
      console.log('tok', token)
      let headers = new HttpHeaders()
        .set('content-type','application/json')
        .set('Accept','application/json')
        .set('authorization','Bearer ' + token.token)
      // headers=headers.append('Access-Control-Allow-Origin', '*')
      // headers=headers.append('content-type','application/x-www-form-urlencoded')
			return headers;
		} else {

			return {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			};
		}
	}

	login(email: string, password: string) {
		let credential;
		if (this.isEmail(email)) {
			credential = { email: email, password };
      console.log('i am here')
			this.http.post<any>(`${API_URL}/users/login`, credential).pipe(
        tap(res => {
          console.log(res);
          localStorage.setItem('authTokenKey', JSON.stringify({token: res.token, userId:res.user._id}) )
        })
			).subscribe(res => console.log(res));
		}
	}

  signUp(user:any){
    this.http.post<any>(`${API_URL}/users/signup`, user).subscribe(res => console.log(res.result));
  }
	// getUserByToken(): Observable<any> {
	// 	const userTokenStr = localStorage.getItem(API_TOKEN);
	// 	const userToken = JSON.parse(userTokenStr);
	// 	return this.http.get(this.baseUrl + '/auth/me', {
	// 		headers: this.authorization()
	// 	}).pipe(
	// 		catchError(err => of(null)),
	// 		tap(e => {
	// 			if (e) {
	// 				e.role = userToken.role;
	// 				this._userRole.next(e.role);
	// 			}
	// 		})
	// 	);
	// }

	// getToken(token: string, username: string) {
	// 	return this.http.post<any>(this.baseUrl + this.url + '/token', {
	// 		token,
	// 		username
	// 	})
	// }





	// register(user: User): Observable<any> {
	// 	return this.http.post<User>(API_USERS_URL + `/auth/signup`, user, { headers: this.authorization() })
	// 		.pipe(
	// 			map((res: User) => {
	// 				return res;
	// 			})
	// 		);
	// }

	// logOut(): Observable<any> {
	// 	const userTokenStr = localStorage.getItem(API_TOKEN);
	// 	const httpHeaders = new HttpHeaders();
	// 	const userToken = JSON.parse(userTokenStr);
	// 	localStorage.removeItem(API_TOKEN);
	// 	httpHeaders.set('authorization', 'Bearer ' + userToken.token);
	// 	return of({});
	// }


	// get currentUserType() {
	// 	const userTokenStr = localStorage.getItem(API_TOKEN);
	// 	const userToken = JSON.parse(userTokenStr);
	// 	return userToken && userToken.role ? userToken.role : '';
	// }

	// get userId() {
	// 	const userTokenStr = localStorage.getItem(API_TOKEN);
	// 	const userToken = JSON.parse(userTokenStr);;
	// 	return userToken && userToken.userId ? userToken.userId : '';
	// }


	isEmail(value:string): boolean {
		const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return !!reg.test(value);
	}
}
