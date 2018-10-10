import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleUpdateComponent implements OnInit {

  title = 'Update Schedule';
  displayButton = false;
  addForm: FormGroup;
  scheduleFormLabel = 'Update Schedule';
  scheduleButton = 'Update';

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
      createdBy: ['', Validators.required],
    });

    const id = localStorage.getItem('id');
    if (+id > 0) {
      this.apiService.getScheduleById(+id).subscribe(data => {
        this.addForm.patchValue(data);
      });
      this.addForm.controls['school_id'].setValue(localStorage.getItem('school_id'));
      this.addForm.controls['teacher_id'].setValue(localStorage.getItem('teacher_id'));
    }



    this.apiService.getSchools().subscribe((data: Array<object>) => {
      this.schools = data;
    });

    this.apiService.getTeachers().subscribe((data: Array<object>) => {
      this.teachers = data;
    });


  }

  onUpdate() {
    this.addForm.value.start = moment(this.addForm.value.start).format("YYYY-MM-DD[T]HH:mm");
    this.addForm.value.end = moment(this.addForm.value.end).format("YYYY-MM-DD[T]HH:mm");
    this.apiService.updateSchedule(this.addForm.value).subscribe(data => {
      this.router.navigate(['schedules']);
    },
      error => {
        alert(error);
      });
  }

}