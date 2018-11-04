import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Teacher } from '../models/teacher';
import { School } from '../models/school';
import { ScheduleEvent } from '../models/scheduleEvent';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  API_URL = environment.apiEndpoint;
  dataChange: BehaviorSubject<ScheduleEvent[]> = new BehaviorSubject<ScheduleEvent[]>([]);

  constructor(private http: HttpClient) {
  }

  // schools
  getSchoolById(id: number) {
    return this.http.get(this.API_URL + '/schools/' + id);
  }

  createSchool(school) {
    return this.http.post(this.API_URL + '/schools', school);
  }

  updateSchool(school: School): Observable<School> {
    return this.http.put<School>(this.API_URL + '/schools/' + school.id, school);
  }

  deleteSchool(id: number) {
    return this.http.delete(this.API_URL + '/schools/' + id);
  }

  findSchools(filter = '', ordering = '', limit = 20, offset = 0) {
    const params = new HttpParams()
      .set('search', filter)
      .set('ordering', ordering)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get(this.API_URL + '/schools', { params });
  }

  // teachers
  getTeacherById(id: number): Observable<Object> {
    return this.http.get(this.API_URL + '/teachers/' + id);
  }

  createTeacher(teacher) {
    return this.http.post(this.API_URL + '/teachers', teacher)
      .pipe(
      catchError(this.handleError('createTeacher', []))
      );
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(this.API_URL + '/teachers/' + teacher.id, teacher);
  }

  deleteTeacher(id: number): Observable<{}> {
    return this.http.delete(this.API_URL + '/teachers/' + id);
  }

  findTeachers(filter = '', ordering = '', limit = 20, offset = 0) {
    const params = new HttpParams()
      .set('search', filter)
      .set('ordering', ordering)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get(this.API_URL + '/teachers', { params });
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
      .set('search', filter)
      .set('ordering', ordering)
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get(this.API_URL + '/schedules', { params });
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
