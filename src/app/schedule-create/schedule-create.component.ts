import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { School } from 'src/app/models/school';
import { Teacher } from 'src/app/models/teacher';

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent implements OnInit {

  title = 'Add Class';
  displayButton = true;
  addForm: FormGroup;
  scheduleFormLabel = 'Add Class';
  scheduleButton = 'Save';
  // drop downs
  public teachers: Array<object> = [];
  public schools: Array<object> = [];

  constructor(
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private router: Router) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      start: ['', Validators.required],
      end: ['', Validators.required],
      school_id: ['', Validators.required],
      teacher_id: ['', Validators.required],
    });

    this.apiService.findSchools('', 'name', 100, 0).subscribe((results: School[]) => {
      this.schools = results['results']
    });

    this.apiService.findTeachers('', 'name', 100, 0).subscribe((results: Teacher[]) => {
      this.teachers = results['results']
    });

  }

  onSave() {
    this.addForm.value.createdBy = localStorage.getItem('user_id');
    this.addForm.value.start = moment(this.addForm.value.start).format('YYYY-MM-DD[T]HH:mm');
    this.addForm.value.end = moment(this.addForm.value.end).format('YYYY-MM-DD[T]HH:mm');
    this.apiService.createSchedule(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['classes']);
      },
      error => {
        alert(error);
      });
  }

}
