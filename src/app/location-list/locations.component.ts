import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatSort, } from '@angular/material';
import { fromEvent } from 'rxjs';
import { APIService } from '../services/api.service';
import { LocationDataSource } from '../services/location.datasource';
import { Location } from '../models/location';
import { merge } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  location: Location;
  dataSource: LocationDataSource;
  displayedColumns = ['name', 'phone', 'email', 'address1', 'active', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private apiService: APIService, private router: Router) { }

  ngOnInit() {
    this.dataSource = new LocationDataSource(this.apiService);
    this.dataSource.loadLocations('','name', 10, 0);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadPage();
      })
      )
      .subscribe();

    this.dataSource.counter$
      .pipe(
      tap((count) => {
        this.paginator.length = count;
      })
    ).subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      tap(() => this.loadPage())
      )
      .subscribe();

  }

  loadPage() {
    let sortName: string;
    if (this.sort.direction === 'asc') {
      sortName = this.sort.active;
    } else {
      sortName = '-' + this.sort.active;
    }
    this.dataSource.loadLocations(
      this.input.nativeElement.value,
      sortName,
      this.paginator.pageSize,
      this.paginator.pageIndex
    );
  }


    editLocation(location: Location): void {
      localStorage.removeItem('id');
      localStorage.setItem('id', location.id.toString());
      this.router.navigate(['create-location']);
    }

    addLocation(): void {
      localStorage.removeItem('id');
      this.router.navigate(['create-location']);
    }

}
