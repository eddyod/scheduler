import {Component, OnInit} from '@angular/core';
import {APIService} from '../api.service';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {

  constructor(private apiService: APIService) {}

  ngOnInit() {
  }

  createTeacher() {

    const teacher = {
      address1: 'Home N 333 Apartment 300',
      createdBy: 1,
      email: 'abbess@email.com',
      name: 'Blow, Joe',
      isActive: true,
      phone: '00121212101'
    };
    this.apiService.createTeacher(teacher).subscribe((response) => {
      console.log(response);
    });
  }
}

