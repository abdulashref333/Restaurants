import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, fromEvent, Observable, of } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

import {ResturantService} from '../services/resturant.service';
@Component({
  selector: 'app-resturants-list',
  templateUrl: './resturants-list.component.html',
  styleUrls: ['./resturants-list.component.css']
})
export class ResturantsListComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  @ViewChild('searchInputCity', { static: true }) searchInputCity!: ElementRef;

  resturants$!: Observable<any>;
	searchEvents: Observable<unknown>[] = [];
	private subscriptions: Subscription[] = [];
  userResturants:any[] = [];
  userId:string = '';
  hasError:boolean = false;
  error:string = '';

  constructor(
    private resturantService: ResturantService,
    private authService: AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.userId;
    this.resturants$ = this.resturantService.getResturants()
      .pipe(
        map(res => {
          const newUserRes:any[] = [];
          res = res.filter((obj:any) => {
            if(obj.userId === this.userId){
              newUserRes.push(obj);
              return false;
            }
            return true;
          })
          this.userResturants = [...newUserRes];
          return res;
        })
      );

      this.searchEvents = [
        fromEvent(this.searchInput.nativeElement, 'keyup'),
        fromEvent(this.searchInputCity.nativeElement, 'keyup')
    ];
    this.searchEvent$();
  }
  getDetails(id:string){
    console.log('details loading...')
    this.router.navigateByUrl(`/resturants/${id}`)
  }
  searchEvent$() {

		this.searchEvents.forEach(e => {
			const searchSubscription = e.pipe(
				debounceTime(150),
				distinctUntilChanged(),
				tap(() => {
          this.searchForm()
				})
			)
				.subscribe();
			this.subscriptions.push(searchSubscription);
		})
	}
  //return the data that will be using in search..
  searchForm() {
    const searchText: string = this.searchInput.nativeElement.value;
    const searchInputCity: string = this.searchInputCity.nativeElement.value;

    // this.resturantService.
    this.resturants$ = this.resturantService.getResturantBy(searchText, searchInputCity);
  }
  editResturant(id:string){
    this.router.navigateByUrl(`/resturants/edit/${id}`)
  }
  deleteResturant(resturantId:string){
    const subscriptions = this.resturantService.deleteResturant(resturantId).subscribe(res => {
      this.userResturants = this.userResturants.filter(obj => obj._id!==resturantId);
    });
    this.subscriptions.push(subscriptions);
  }
  //unsubscript from all events before going further to clear memory.
  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
