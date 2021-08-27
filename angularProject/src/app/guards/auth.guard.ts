import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor( private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authTokenKey');
    if(token){
		  return !!token;
    } else{
      this.router.navigateByUrl('/auth/login')
      return false;
    }
	}
}
