import {Component, OnInit} from '@angular/core';
import {APIService} from '../api.service';
import {Teacher} from '../teacher';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {

  teacher = new Teacher();
  constructor(private apiService: APIService) {}

  ngOnInit() {
  }

  onSubmit() {

    this.apiService.createTeacher(this.teacher).subscribe((response) => {
      console.log(response);
    });
  }
}

