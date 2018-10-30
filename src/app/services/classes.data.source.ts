import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { ScheduleEvent } from '../models/scheduleEvent';
import { APIService } from './api.service';
import { BehaviorSubject, merge } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { MatPaginator, MatSort } from '@angular/material';



export class ClassesDataSource extends DataSource<ScheduleEvent> {
  apiDatabase: APIService | null;
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: ScheduleEvent[] = [];
  renderedData: ScheduleEvent[] = [];

  constructor(public _apiDatabase: APIService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ScheduleEvent[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._apiDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._apiDatabase.getAllClasses();


    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this._apiDatabase.data.slice().filter((issue: ScheduleEvent) => {
        const searchStr = (issue.id + issue.title + issue.createdOn).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }


  /** Returns a sorted copy of the database data. */
  sortData(data: ScheduleEvent[]): ScheduleEvent[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'createdOn': [propertyA, propertyB] = [a.createdOn, b.createdOn]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}