import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';

import { School } from '../models/school';
import { APIService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class SchoolDataSource implements DataSource<School> {

  public schoolsSubject = new BehaviorSubject<School[]>([]);

  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
  public resultCount: number;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: APIService) {

  }

  loadSchools(filter: string, ordering: string, limit: number, offset: number) {

    this.loadingSubject.next(true);

    this.apiService.findSchools(filter, ordering, limit, offset)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((results: School[]) => {
        this.schoolsSubject.next(results['results']);
        this.countSubject.next(results['count']);
      }
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<School[]> {
    console.log('Connecting data source');
    return this.schoolsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.schoolsSubject.complete();
    this.loadingSubject.complete();
  }

}
