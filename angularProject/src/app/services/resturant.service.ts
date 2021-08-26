import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';;
import { AuthService } from '../services/auth.service';

const API_URL = environment.crudServiceUrl;
@Injectable({
  providedIn: 'root'
})
export class ResturantService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ){}

  getResturants(): Observable<any>{
    return this.http.get<any>(`${API_URL}/resturants`)
  }

  getResturantBy(name:string, city:string): Observable<any>{
    return this.http.get<any>(`${API_URL}/resturants/?name=${name}&city=${city}`);
  }

  createResturant(resturntData:any): Observable<any>{
    // const headers:HttpHeaders = this.authService.authorization();
    const url = `${API_URL}/resturants`;
    return this.http.post(url, resturntData,{headers:this.authService.authorization()});
  }
}
