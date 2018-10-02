import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Teacher } from './teacher';
import { School } from './school';
import { ScheduleEvent } from './scheduleEvent';
import { Page } from './page';
import { queryPaginated } from './queryPaginated';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //  'Authorization': 'my-auth-token'
  })
};



@Injectable({
  providedIn: 'root'
})
export class APIService {


  API_URL = 'http://www.mephistosoftware.com/rester';

  constructor(private http: HttpClient) { }

  // teachers
  getTeacherById(id: number) {
    return this.http.get(this.API_URL + '/teachers/' + id);
  }

  getTeachers(): Observable<Object[]> {
    return this.http.get<Object[]>(this.API_URL + '/list-teachers')
      .pipe(
      catchError(this.handleError('getTeachers', []))
      );
  }

  createTeacher(teacher) {
    return this.http.post(this.API_URL + '/teachers/', teacher);
  }

  updateTeacher(teacher) {
    return this.http.put(this.API_URL + '/teachers/' + teacher.id, teacher, httpOptions);
  }

  deleteTeacher(id: number) {
    return this.http.delete(this.API_URL + '/teachers/' + id);
  }

  listTeachers(urlOrFilter?: string | object): Observable<Page<Teacher>> {
    return queryPaginated<Teacher>(this.http, this.API_URL + '/teachers', urlOrFilter);
  }
  // schools
  getSchoolById(id: number) {
    return this.http.get(this.API_URL + '/schools/' + id);
  }

  getSchools() {
    return this.http.get(this.API_URL + '/list-schools');
  }

  createSchool(school) {
    return this.http.post(this.API_URL + '/schools', school);
  }

  updateSchool(school) {
    return this.http.put(this.API_URL + '/schools/' + school.id, school, httpOptions);
  }

  deleteSchool(id: number) {
    return this.http.delete(this.API_URL + '/schools/' + id);
  }

  listSchools(urlOrFilter?: string | object): Observable<Page<School>> {
    return queryPaginated<School>(this.http, this.API_URL + '/schools', urlOrFilter);
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
    return this.http.post(this.API_URL + '/schedules', schedule);
  }

  updateSchedule(schedule) {
    return this.http.put(this.API_URL + '/schedules/' + schedule.id, schedule, httpOptions);
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
