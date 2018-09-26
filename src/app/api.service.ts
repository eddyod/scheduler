import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { School } from './school';

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

  constructor(private httpClient: HttpClient) { }

  // teachers
  getTeacherById(id: number) {
    return this.httpClient.get(this.API_URL + '/teachers/' + id);
  }

  getTeachers() {
    return this.httpClient.get(this.API_URL + '/teachers');
  }

  createTeacher(teacher) {
    return this.httpClient.post(this.API_URL + '/teachers/', teacher);
  }

  updateTeacher(teacher) {
    return this.httpClient.put(this.API_URL + '/teachers/' + teacher.id, teacher, httpOptions);
  }

  deleteTeacher(id: number) {
    return this.httpClient.delete(this.API_URL + '/teachers/' + id);
  }

  // schools
  getSchoolById(id: number) {
    return this.httpClient.get(this.API_URL + '/schools/' + id);
  }

  getSchools() {
    return this.httpClient.get(this.API_URL + '/schools');
  }

  createSchool(school) {
    return this.httpClient.post(this.API_URL + '/schools', school);
  }

  updateSchool(school) {
    return this.httpClient.put(this.API_URL + '/schools/' + school.id, school, httpOptions);
  }

  deleteSchool(id: number) {
    return this.httpClient.delete(this.API_URL + '/schools/' + id);
  }

  // schedules
  getScheduleById(id: number) {
    return this.httpClient.get(this.API_URL + '/schedules/' + id);
  }

  getSchedules() {
    return this.httpClient.get(this.API_URL + '/schedules');
  }

  createSchedule(schedule) {
    return this.httpClient.post(this.API_URL + '/schedules', schedule);
  }

  updateSchedule(schedule) {
    return this.httpClient.put(this.API_URL + '/schedules/' + schedule.id, schedule, httpOptions);
  }

  deleteSchedule(id: number) {
    return this.httpClient.delete(this.API_URL + '/schedules/' + id);
  }


}
