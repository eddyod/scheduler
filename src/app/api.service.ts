import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  // teachers
  getTeacherById(id: number) {
    return this.http.get(this.API_URL + '/teachers/' + id);
  }

  getTeachersXXX(): Observable<Object[]> {
    return this.http.get<Object[]>(this.API_URL + '/teachers');
  }

  /** GET heroes from the server */
  getTeachers(): Observable<Object[]> {
    return this.http.get<Object[]>(this.API_URL + '/teachers')
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
    return this.http.put(this.API_URL + '/schools/' + school.id, school, httpOptions);
  }

  deleteSchool(id: number) {
    return this.http.delete(this.API_URL + '/schools/' + id);
  }

  // schedules
  getScheduleById(id: number) {
    return this.http.get(this.API_URL + '/schedules/' + id);
  }

  getSchedules() {
    return this.http.get(this.API_URL + '/schedules');
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
