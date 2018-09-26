import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {School} from './school';

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

  // schools
  getSchoolById(id: number) {
    return this.httpClient.get(this.API_URL + '/schools/' + id);
  }

  getSchools() {
    return this.httpClient.get(this.API_URL + '/schools/');
  }

  createSchool(school) {
    console.log('updateSchool school.name is ' + school.name);
    return this.httpClient.post(this.API_URL + '/schools/', school);
  }

  updateSchool(school: School) {
    console.log('updateSchool school.id is ' + school.name);
    return this.httpClient.patch(this.API_URL + '/schools/' + school.id, school );
  }

  deleteSchool(id: number) {
    return this.httpClient.delete(this.API_URL + '/schools/' + id);
  }

}
