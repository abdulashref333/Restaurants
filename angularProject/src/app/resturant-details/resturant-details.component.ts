import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResturantService } from '../services/resturant.service';

@Component({
  selector: 'app-resturant-details',
  templateUrl: './resturant-details.component.html',
  styleUrls: ['./resturant-details.component.css']
})
export class ResturantDetailsComponent implements OnInit {
  resturant$!:Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private resturantService:ResturantService,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if(id){
        this.resturant$ = this.resturantService.getResturantById(id).pipe(map(res => res[0]))
      }
    })
  }

}
