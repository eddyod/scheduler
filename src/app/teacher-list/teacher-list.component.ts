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

  private teachers: Array<object> = [];
  selectedTeacher: Teacher;


  constructor(private apiService: APIService, private router: Router) {}

  ngOnInit() {
    this.getTeachers();
  }

  onSelect(teacher: Teacher): void {
    this.selectedTeacher = teacher;
  }

  editTeacher(teacher: Teacher): void {
    localStorage.removeItem('editTeacherId');
    localStorage.setItem('id', teacher.id.toString());
    this.router.navigate(['create-teacher']);
  }

  public getTeachers() {
    this.apiService.getTeachers().subscribe((data: Array<object>) => {
      this.teachers = data;
      console.log(data);
    });
  }

}
