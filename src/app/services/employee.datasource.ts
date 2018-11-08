import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';

import { Employee } from '../models/employee';
import { APIService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class EmployeeDataSource implements DataSource<Employee> {

  public employeesSubject = new BehaviorSubject<Employee[]>([]);

  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
  public resultCount: number;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: APIService) {

  }

  loadEmployees(filter: string, ordering: string, limit: number, offset: number) {

    this.loadingSubject.next(true);

    this.apiService.findEmployees(filter, ordering, limit, offset)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((results: Employee[]) => {
        this.employeesSubject.next(results['results']);
        this.countSubject.next(results['count']);
      }
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<Employee[]> {
    console.log('Connecting data source');
    return this.employeesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.employeesSubject.complete();
    this.loadingSubject.complete();
  }

}
