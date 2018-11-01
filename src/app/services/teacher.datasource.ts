import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';

import { Teacher } from '../models/teacher';
import { APIService } from './api.service';
import { BehaviorSubject } from 'rxjs';

import { catchError, finalize } from 'rxjs/operators';



export class TeacherDataSource implements DataSource<Teacher> {

  private teachersSubject = new BehaviorSubject<Teacher[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: APIService) {

  }

  loadTeachers(
    filter: string,
    limit: number,
    offset: number) {

    this.loadingSubject.next(true);

    this.apiService.findTeachers(filter, limit, offset)
    .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(teachers => this.teachersSubject.next(teachers));

  }

  connect(collectionViewer: CollectionViewer): Observable<Teacher[]> {
    console.log('Connecting data source');
    return this.teachersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.teachersSubject.complete();
    this.loadingSubject.complete();
  }

}