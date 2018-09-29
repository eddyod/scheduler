import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from '../api.service';
import {Teacher} from '../teacher';


@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {

  private teachers: Array<Object> = [];


  constructor(private apiService: APIService, private router: Router) {}

  ngOnInit() {
    this.getTeachers();
  }


  public getTeachers() {
    this.apiService.getTeachers().subscribe((data: Array<object>) => {
      this.teachers = data;
    });
  }

  deleteTeacher(teacher: Teacher): void {
    this.apiService.deleteTeacher(teacher.id)
      .subscribe(data => {
        this.teachers = this.teachers.filter(u => u !== teacher);
      });
    this.router.navigate(['teachers']);
  }

  editTeacher(teacher: Teacher): void {
    localStorage.removeItem('id');
    localStorage.setItem('id', teacher.id.toString());
    this.router.navigate(['create-teacher']);
  }

  addTeacher(): void {
    localStorage.removeItem('id');
    this.router.navigate(['create-teacher']);
  }


}
