import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { APIService } from './api.service';
import { Location } from '../models/location';

export class LocationDataSource implements DataSource<Location> {

  public locationsSubject = new BehaviorSubject<Location[]>([]);

  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();
  public resultCount: number;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private apiService: APIService) {

  }

  loadLocations(filter: string, ordering: string, limit: number, offset: number) {

    this.loadingSubject.next(true);

    this.apiService.findLocations(filter, ordering, limit, offset)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((results: Location[]) => {
        this.locationsSubject.next(results['results']);
        this.countSubject.next(results['count']);
      }
      );
  }

  connect(collectionViewer: CollectionViewer): Observable<Location[]> {
    console.log('Connecting data source');
    return this.locationsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.locationsSubject.complete();
    this.loadingSubject.complete();
  }

}
