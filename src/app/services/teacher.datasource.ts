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
      .subscribe((teachers: Teacher[]) => {
        this.teachersSubject.next(teachers);
        this.countSubject.next(teachers.length)
        console.log(teachers);
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
