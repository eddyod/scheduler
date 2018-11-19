import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';

import { Site } from '../models/site';
import { APIService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class SiteDataSource implements DataSource<Site> {

  public sitesSubject = new BehaviorSubject<Site[]>([]);

  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
  public resultCount: number;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: APIService) {
  }

  loadRecords(filter: string, ordering: string, limit: number, offset: number) {

    this.loadingSubject.next(true);

    this.apiService.findSites(filter, ordering, limit, offset)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((results: Site[]) => {
        this.sitesSubject.next(results['results']);
        this.countSubject.next(results['count']);
      }
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<Site[]> {
    return this.sitesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.sitesSubject.complete();
    this.loadingSubject.complete();
  }

}
