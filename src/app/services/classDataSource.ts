import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { ScheduleEvent } from '../models/scheduleEvent';
import { APIService } from './api.service';
import {BehaviorSubject} from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';


export class ClassDataSource implements DataSource<ScheduleEvent> {
  private lessonsSubject = new BehaviorSubject<ScheduleEvent[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: APIService) { }

  connect(collectionViewer: CollectionViewer): Observable<ScheduleEvent[]> {
    return this.lessonsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.lessonsSubject.complete();
    this.loadingSubject.complete();
  }

  loadLessons(courseId: number, filter = '',
    sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

    this.loadingSubject.next(true);

    this.apiService.findClasses(courseId, filter, sortDirection,
      pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(lessons => this.lessonsSubject.next(lessons));
  }
}
