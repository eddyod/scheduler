import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';

import { ScheduleEvent } from '../models/scheduleEvent';
import { APIService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class ClassDataSource implements DataSource<ScheduleEvent> {

  public classesSubject = new BehaviorSubject<ScheduleEvent[]>([]);

  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
  public resultCount: number;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: APIService) {

  }

  loadRecords(filter: string, ordering: string, limit: number, offset: number) {

    this.loadingSubject.next(true);

    this.apiService.findClasses(filter, ordering, limit, offset)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((results: ScheduleEvent[]) => {
        this.classesSubject.next(results['results']);
        this.countSubject.next(results['count']);
      }
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<ScheduleEvent[]> {
    console.log('Connecting data source');
    return this.classesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.classesSubject.complete();
    this.loadingSubject.complete();
  }

}
