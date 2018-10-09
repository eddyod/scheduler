import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Teacher } from './teacher';
import { School } from './school';
import { ScheduleEvent } from './scheduleEvent';
import { Page } from './page';
import { queryPaginated } from './queryPaginated';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  // API_URL = 'http://www.mephistosoftware.com/rester';
  API_URL = 'http://localhost:8000';

  constructor(private http: HttpClient,
    private authService: AuthService) {
  }

  // teachers
  getTeacherById(id: number) {
    return this.http.get(this.API_URL + '/teachers/' + id);
  }

  getTeachers(): Observable<Object[]> {
    return this.http.get<Object[]>(this.API_URL + '/teachers')
      .pipe(
      catchError(this.handleError('getTeachers', []))
      );
  }

  createTeacher(teacher) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.post(this.API_URL + '/teachers', teacher, { headers: headers })
      .pipe(
      catchError(this.handleError('createTeacher', []))
      );
  }

  updateTeacher(teacher) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.put(this.API_URL + '/teachers/' + teacher.id, teacher, {headers: headers});
  }

  deleteTeacher(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.delete(this.API_URL + '/teachers/' + id, {headers:headers});
  }

  listTeachers(urlOrFilter?: string | object): Observable<Page<Teacher>> {
    return queryPaginated<Teacher>(this.http, this.API_URL + '/list-teachers', urlOrFilter);
  }
  // schools
  getSchoolById(id: number) {
    return this.http.get(this.API_URL + '/schools/' + id);
  }

  getSchools() {
    return this.http.get(this.API_URL + '/schools');
  }

  createSchool(school) {
    return this.http.post(this.API_URL + '/schools', school);
  }

  updateSchool(school) {
    return this.http.put(this.API_URL + '/schools/' + school.id, school);
  }

  deleteSchool(id: number) {
    return this.http.delete(this.API_URL + '/schools/' + id);
  }

  listSchools(urlOrFilter?: string | object): Observable<Page<School>> {
    return queryPaginated<School>(this.http, this.API_URL + '/list-schools', urlOrFilter);
  }

  // schedules
  getScheduleById(id: number) {
    return this.http.get(this.API_URL + '/schedules/' + id);
  }

  getSchedules() {
    return this.http.get(this.API_URL + '/schedules');
  }

  // no pagination
  getEvents() {
    return this.http.get(this.API_URL + '/events');
  }

  createSchedule(schedule) {
    return this.http.post(this.API_URL + '/schedules', schedule)
      .pipe(
      catchError(this.handleError<any>('createSchedule'))
      );
  }

  updateSchedule(schedule) {
    return this.http.put(this.API_URL + '/schedules/' + schedule.id, schedule);
  }

  deleteSchedule(id: number) {
    return this.http.delete(this.API_URL + '/schedules/' + id);
  }

  listSchedules(urlOrFilter?: string | object): Observable<Page<ScheduleEvent>> {
    return queryPaginated<ScheduleEvent>(this.http, this.API_URL + '/schedules', urlOrFilter);
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
