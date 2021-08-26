import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';;

const API_URL = environment.authenticationServiceUrl;
const API_TOKEN = 'authTokenKey';


@Injectable()
export class AuthService{

	// Authentication/Authorization
  constructor(
    private http: HttpClient,
  ){

  }
	protected authorization() {
		const token = JSON.parse(String(localStorage.getItem('authTokenKey')));

		if (token) {

			return {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + token.token,
			};
		} else {

			return {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			};
		}
	}

	login(userName: string, password: string) {
		let credential;
		if (this.isEmail(userName)) {
			credential = { username: userName, password };

			if (this.isEmail(userName)) {
				credential = { username: userName, password };

			} else {
				credential = { username: userName, password, mobile: userName };
			}
			this.http.post<any>(`${API_URL}/login/`, credential).pipe(
        tap(res => console.log(res))
			).subscribe(res => console.log(res));
		}
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
