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
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class APIService {


  // API_URL = 'http://www.mephistosoftware.com/rester';
  //API_URL = 'http://10.195.4.147:8000';
  API_URL = environment.apiEndpoint;
  
  constructor(private http: HttpClient,
    private authService: AuthService) {
  }

  // teachers
  getTeacherById(id: number): Observable<Object> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.get(this.API_URL + '/teachers/' + id, { headers: headers });
  }

  getTeachers(): Observable<Object[]> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.get<Object[]>(this.API_URL + '/teachers', { headers: headers })
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

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.put<Teacher>(this.API_URL + '/teachers/' + teacher.id, teacher, { headers: headers });
  }

  deleteTeacher(id: number): Observable<{}> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.delete(this.API_URL + '/teachers/' + id, { headers: headers });
  }

  listTeachers(urlOrFilter?: string | object): Observable<Page<Teacher>> {
    return queryPaginated<Teacher>(this.http, this.API_URL + '/list-teachers', urlOrFilter);
  }
  // schools
  getSchoolById(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.get(this.API_URL + '/schools/' + id, { headers: headers });
  }

  getSchools() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.get(this.API_URL + '/schools', { headers: headers });
  }

  createSchool(school) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.post(this.API_URL + '/schools', school, { headers: headers });
  }

  updateSchool(school: School): Observable<School> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.put<School>(this.API_URL + '/schools/' + school.id, school, { headers: headers });
  }

  deleteSchool(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.delete(this.API_URL + '/schools/' + id, { headers: headers });
  }

  listSchools(urlOrFilter?: string | object): Observable<Page<School>> {
    return queryPaginated<School>(this.http, this.API_URL + '/list-schools', urlOrFilter);
  }

  // schedules
  getScheduleById(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.get(this.API_URL + '/schedules/' + id, { headers: headers });
  }

  getSchedules() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.get(this.API_URL + '/schedules', { headers: headers });
  }

  // no pagination
  getEvents() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.get(this.API_URL + '/events', { headers: headers });
  }

  createSchedule(schedule) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.post(this.API_URL + '/schedules', schedule, { headers: headers })
      .pipe(
        catchError(this.handleError<any>('createSchedule'))
      );
  }

  updateSchedule(schedule: ScheduleEvent): Observable<ScheduleEvent> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.put<ScheduleEvent>(this.API_URL + '/schedules/' + schedule.id, schedule, { headers: headers });
  }

  deleteSchedule(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "JWT " + this.authService.token);
    return this.http.delete(this.API_URL + '/schedules/' + id, { headers: headers });
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
