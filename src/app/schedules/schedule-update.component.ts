import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Location } from '../models/location';
import { Employee } from '../models/employee';

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
  public employees: Array<object> = [];
  public locations: Array<object> = [];

  constructor(
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
      this.authService.title = 'Update Schedule';
  }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      start: ['', Validators.required],
      end: ['', Validators.required],
      location_id: ['', Validators.required],
      employee_id: ['', Validators.required],
      completed: ['', Validators.required],
      pay_rate: ['', Validators.required]
    });

    const id = sessionStorage.getItem('id');
    if (+id > 0) {
      this.apiService.getScheduleById(+id).subscribe(data => {
        this.addForm.patchValue(data);
      });
      this.addForm.controls['location_id'].setValue(sessionStorage.getItem('location_id'));
      this.addForm.controls['employee_id'].setValue(sessionStorage.getItem('employee_id'));
    }


    this.apiService.findLocations('', 'name', 100, 0).subscribe((results: Location[]) => {
      this.locations = results['results'];
    });

    this.apiService.findEmployees('', 'name', 100, 0).subscribe((results: Employee[]) => {
      this.employees = results['results'];
    });


  }

  onUpdate() {
    this.addForm.value.site = this.authService.site.id;
    this.addForm.value.start = moment(this.addForm.value.start).format('YYYY-MM-DD[T]HH:mm');
    this.addForm.value.end = moment(this.addForm.value.end).format('YYYY-MM-DD[T]HH:mm');
    this.apiService.updateSchedule(this.addForm.value).subscribe(data => {
      this.router.navigate(['schedules']);
    },
      error => {
        alert(error);
      });
  }

}
