import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Employee } from '../models/employee';
import { Location } from '../models/location';
import { Site } from '../models/site';
import { ScheduleEvent } from '../models/scheduleEvent';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  API_URL = environment.apiEndpoint;

  constructor(
    private http: HttpClient,
    public authService: AuthService) {
  }

  // locations
  getLocationById(id: number) {
    return this.http.get(this.API_URL + '/locations/' + id);
  }

  createLocation(location) {
    return this.http.post(this.API_URL + '/locations', location);
  }

  updateLocation(location: Location): Observable<Location> {
    return this.http.put<Location>(this.API_URL + '/locations/' + location.id, location);
  }

  deleteLocation(id: number) {
    return this.http.delete(this.API_URL + '/locations/' + id);
  }

  findLocations(filter = '', ordering = '', limit = 20, offset = 0) {
    const params = new HttpParams()
      .set('site_id', this.authService.site.id)
      .set('search', filter)
      .set('ordering', ordering)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get(this.API_URL + '/locations', { params });
  }

  // employees
  getEmployeeById(id: number): Observable<Object> {
    return this.http.get(this.API_URL + '/employees/' + id);
  }

  createEmployee(employee) {
    return this.http.post(this.API_URL + '/employees', employee)
      .pipe(
        catchError(this.handleError('createEmployee', []))
      );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.API_URL + '/employees/' + employee.id, employee);
  }

  deleteEmployee(id: number): Observable<{}> {
    return this.http.delete(this.API_URL + '/employees/' + id);
  }

  findEmployees(filter = '', ordering = '', limit = 20, offset = 0) {
    const params = new HttpParams()
      .set('site_id', this.authService.site.id)
      .set('search', filter)
      .set('ordering', ordering)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get(this.API_URL + '/employees', { params });
  }

  // schedules
  getScheduleById(id: number) {
    return this.http.get(this.API_URL + '/schedules/' + id);
  }

  createSchedule(schedule) {
    return this.http.post(this.API_URL + '/schedules', schedule)
      .pipe(
        catchError(this.handleError<any>('createSchedule'))
      );
  }

  updateSchedule(schedule: ScheduleEvent): Observable<ScheduleEvent> {
    return this.http.put<ScheduleEvent>(this.API_URL + '/schedules/' + schedule.id, schedule);
  }

  deleteSchedule(id: number) {
    return this.http.delete(this.API_URL + '/schedules/' + id);
  }

  findClasses(filter = '', ordering = '', limit = 20, offset = 0) {
    const params = new HttpParams()
      .set('site_id', this.authService.site.id)
      .set('search', filter)
      .set('ordering', ordering)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get(this.API_URL + '/schedules', { params });
  }

  // sites

  findSites(filter = '', ordering = '', limit = 20, offset = 0) {
    const params = new HttpParams()
      .set('search', filter)
      .set('ordering', ordering)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get(this.API_URL + '/sites', { params });
  }

  createSite(site) {
    return this.http.post(this.API_URL + '/sites', site)
      .pipe(
        catchError(this.handleError('createSite', []))
      );
  }

  registerSite(site) {
    return this.http.post(this.API_URL + '/users/' + site.owner + '/sites', site)
      .pipe(
        catchError(this.handleError('registerSite', []))
      );
  }

  registerUserSite(userSite) {
    return this.http.post(this.API_URL + '/api/user_sites', userSite)
      .pipe(
        catchError(this.handleError('registerUserSite', []))
      );
  }

  updateSite(site: Site): Observable<Site> {
    return this.http.put<Site>(this.API_URL + '/sites/' + site.id, site);
  }

  deleteSite(id: number): Observable<{}> {
    return this.http.delete(this.API_URL + '/sites/' + id);
  }


  // events with limited pagination
  getEvents() {
    return this.http.get(this.API_URL + '/events');
  }
  // Attendance
  getAttendance(params) {
    return this.http.get(this.API_URL + '/attendance', { params });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
