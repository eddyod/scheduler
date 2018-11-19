import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Location } from 'src/app/models/location';
import { Employee } from 'src/app/models/employee';


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
  public employees: Array<object> = [];
  public locations: Array<object> = [];

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      start: ['', Validators.required],
      end: ['', Validators.required],
      location_id: ['', Validators.required],
      employee_id: ['', Validators.required],
      pay_rate: ['', Validators.required]
    });

    this.apiService.findLocations('', 'name', 100, 0).subscribe((results: Location[]) => {
      this.locations = results['results']
    });

    this.apiService.findEmployees('', 'name', 100, 0).subscribe((results: Employee[]) => {
      this.employees = results['results']
    });

  }

  onSave() {
    this.addForm.value.site = this.authService.user.main_site;
    this.addForm.value.start = moment(this.addForm.value.start).format('YYYY-MM-DD[T]HH:mm');
    this.addForm.value.end = moment(this.addForm.value.end).format('YYYY-MM-DD[T]HH:mm');
    this.apiService.createSchedule(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['schedules']);
      },
      error => {
        alert(error);
      });
  }

}
