import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, fromEvent, Observable } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';

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

  constructor(
    private resturantService: ResturantService,

  ) { }

  ngOnInit(): void {
    this.resturants$ = this.resturantService.getResturants();
      this.searchEvents = [
        fromEvent(this.searchInput.nativeElement, 'keyup'),
        fromEvent(this.searchInputCity.nativeElement, 'keyup')
    ];
    this.searchEvent$();
  }
  getDetails(){
    console.log('details loading...')
  }
  searchEvent$() {

		this.searchEvents.forEach(e => {
			const searchSubscription = e.pipe(
				debounceTime(150),
				distinctUntilChanged(),
				tap(() => {
					// this.fetch();
          console.log(this.searchForm());
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

  //unsubscript from all events before going further to clear memory.
  ngOnDestroy() {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
