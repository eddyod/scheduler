import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Teacher } from '../models/teacher';
import { School } from '../models/school';
import { ScheduleEvent } from '../models/scheduleEvent';
import { Page } from '../models/page';
import { queryPaginated } from '../models/queryPaginated';
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

  get data(): ScheduleEvent[] {
    return this.dataChange.value;
  }

  // teachers
  getTeacherById(id: number): Observable<Object> {
    return this.http.get(this.API_URL + '/teachers/' + id);
  }

  getTeachers(): Observable<Object[]> {
    return this.http.get<Object[]>(this.API_URL + '/teachers')
      .pipe(
        catchError(this.handleError('getTeachers', []))
      );
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

  updateSchool(school: School): Observable<School> {
    return this.http.put<School>(this.API_URL + '/schools/' + school.id, school);
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

  getAllClasses(): void {
    this.http.get<ScheduleEvent[]>(this.API_URL + '/class').subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }


  // no pagination
  getClasses() {
    return this.http.get(this.API_URL + '/class');
  }


  findTeachers(filter = '', ordering = '', limit = 20, offset = 0) {
    const params = new HttpParams()
            .set('search', filter)
            .set('ordering', ordering)
            .set('limit', limit.toString())
            .set('offset', offset.toString());

    return this.http.get(this.API_URL + '/list-teachers', {params});
  }

  findTeachersXXX(nameFilter = '', ordering = '', limit = 20, offset = 0): Observable<Teacher[]> {
    return this.http.get(this.API_URL + '/list-teachers', {
      params: new HttpParams()
        .set('name', nameFilter)
        .set('limit', limit.toString())
        .set('offset', offset.toString())
      //      }).pipe(map(results => results['results'])
    }).pipe(map(results => results['results'])
    );
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

  updateSchedule(schedule: ScheduleEvent): Observable<ScheduleEvent> {
    return this.http.put<ScheduleEvent>(this.API_URL + '/schedules/' + schedule.id, schedule);
  }

  deleteSchedule(id: number) {
    return this.http.delete(this.API_URL + '/schedules/' + id);
  }

  listSchedules(urlOrFilter?: string | object): Observable<Page<ScheduleEvent>> {
    return queryPaginated<ScheduleEvent>(this.http, this.API_URL + '/schedules', urlOrFilter);
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
