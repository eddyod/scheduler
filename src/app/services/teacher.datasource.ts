import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';

import { Teacher } from '../models/teacher';
import { APIService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class TeacherDataSource implements DataSource<Teacher> {

  public teachersSubject = new BehaviorSubject<Teacher[]>([]);

  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
  public resultCount: number;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: APIService) {

  }

  loadTeachers(filter: string, ordering: string, limit: number, offset: number) {

    this.loadingSubject.next(true);

    this.apiService.findTeachers(filter, ordering, limit, offset)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((results: Teacher[]) => {
        this.teachersSubject.next(results['results']);
        this.countSubject.next(results['count']);
      }
      );
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
