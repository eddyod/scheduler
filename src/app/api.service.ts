import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  API_URL = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {}

  getTeachers() {
    return this.httpClient.get(this.API_URL + '/teachers');
  }

  createTeacher(teacher) {
    return this.httpClient.post(this.API_URL + '/teachers/', teacher);
  }

}
