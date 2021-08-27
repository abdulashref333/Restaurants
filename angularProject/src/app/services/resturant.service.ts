import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';;
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

const API_URL = environment.crudServiceUrl + '/resturants';
@Injectable({
  providedIn: 'root'
})
export class ResturantService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ){}

  getResturants(): Observable<any>{
    return this.http.get<any>(API_URL)
  }

  getResturantBy(name:string, city:string): Observable<any>{
    return this.http.get<any>(`${API_URL}/?name=${name}&city=${city}`)
      .pipe(map(res => {
        return res.filter((ele:any) => ele.userId != this.authService.userId)
      }));
  }

  getResturantById(id:string): Observable<any>{
    return this.http.get<any>(API_URL+`/${id}`);
  }

  addResturant(resturantData:any): Observable<any>{
    return resturantData._id ? this.updateResturant(resturantData) : this.createResturant(resturantData);
  }

  createResturant(resturntData:any): Observable<any>{
    return this.http.post(API_URL, resturntData,{headers:this.authService.authorization()});
  }

  updateResturant(resturntData:any): Observable<any>{
    return this.http.patch(API_URL + `/${resturntData._id}`, resturntData,{headers:this.authService.authorization()});
  }

  deleteResturant(resturantId:string): Observable<any>{
    return this.http.delete(API_URL+`/${resturantId}`, {headers: this.authService.authorization()})
  }


}
