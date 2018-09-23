import {Component, OnInit} from '@angular/core';
import {APIService} from '../api.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  private teachers: Array<object> = [];

  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.getTeachers();
  }

  public getTeachers() {
    this.apiService.getTeachers().subscribe((data: Array<object>) => {
      this.teachers = data;
      console.log(data);
    });
  }

}
