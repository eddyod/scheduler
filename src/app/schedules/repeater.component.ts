import { Component, OnInit } from '@angular/core';
import { RRule } from 'rrule';
import {
  FormGroup, FormBuilder, Validators,
  FormControl, FormArray, ValidatorFn
} from '@angular/forms';
import * as moment from 'moment';

import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Schedule } from '../models/schedule';
import { Location } from '../models/location';
import { Employee } from '../models/employee';

const timezoneOffset = new Date().getTimezoneOffset();
const hoursOffset = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(2, '0');
const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
const direction = timezoneOffset > 0 ? '-' : '+';
const timezoneOffsetString = `${direction}${hoursOffset}${minutesOffset}`;


@Component({
  selector: 'app-repeater',
  templateUrl: './repeater.component.html',
  styleUrls: ['./repeater.component.css']
})
export class RepeaterComponent implements OnInit {

  displayStatus = false;
  insertCount = 0;
  addForm: FormGroup;
  byweekdays = [
    { id: 6, name: 'Sun' },
    { id: 0, name: 'Mon' },
    { id: 1, name: 'Tue' },
    { id: 2, name: 'Wed' },
    { id: 3, name: 'Thu' },
    { id: 4, name: 'Fri' },
    { id: 5, name: 'Sat' },
  ];

  public scheduleForms: Array<Schedule> = [];
  scheduleFormLabel = 'Create repeating schedules for a single employee at one location for the current month';
  private startDate: Date;
  private endDate: Date;
  private startString: string;
  // drop downs
  public employees: Array<Object> = [];
  public locations: Array<Location> = [];
  public maxDate: string;

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      this.authService.title = 'Create Multiple Schedules';
  }

  private getMaxDate(): string {
    const mDate = new Date();
    mDate.setMonth(mDate.getMonth() + 1);
    return moment(mDate).format('YYYY-MM-DD');
  }



  ngOnInit() {
    this.maxDate = this.getMaxDate();
    // controls[2].setValue(true);
    const controls = this.byweekdays.map(c => new FormControl(false));
    this.addForm = this.formBuilder.group({
      start: ['', Validators.required ],
      end: ['', Validators.required ],
      duration: ['', Validators.required],
      location_id: ['', Validators.required],
      employee_id: ['', Validators.required],
      pay_rate: ['', Validators.required],
      byweekdays: new FormArray(controls, minSelectedCheckboxes(1))
    });

    function minSelectedCheckboxes(min = 1) {
      const validator: ValidatorFn = (formArray: FormArray) => {
        const totalSelected = formArray.controls
          // get a list of checkbox values (boolean)
          .map(control => control.value)
          // total up the number of checked checkboxes
          .reduce((prev, next) => next ? prev + next : prev, 0);

        // if the total is not greater than the minimum, return the error message
        return totalSelected >= min ? null : { required: true };
      };

      return validator;
    }

    this.apiService.findLocations('', 'name', 100, 0).subscribe((results: Location[]) => {
      this.locations = results['results'];
    });

    this.apiService.findEmployees('', 'name', 100, 0).subscribe((results: Employee[]) => {
      this.employees = results['results'];
    });

  }

  checkAndSave() {
    this.checkTime();
    this.onSave();
  }


  checkTime() {
    const selectedOrderIds = this.addForm.value.byweekdays
      .map((v, i) => v ? this.byweekdays[i].id : null)
      .filter(v => v !== null);
    this.scheduleForms = [];
    this.startDate = new Date(this.addForm.value.start + timezoneOffsetString);
    this.endDate = new Date(this.addForm.value.end + 'GMT' + timezoneOffsetString);

    const rule =
      new RRule({
        freq: RRule.WEEKLY,
        dtstart: this.startDate,
        until: this.endDate,
        byweekday: selectedOrderIds
      });
    // Add a rrule to rruleSet

    rule.all().forEach(r => {
      this.startString = moment(r).format('YYYY-MM-DD[T]HH:mm');
      const tStart = moment(this.startString);
      const tEnd = moment(tStart).add(this.addForm.value.duration, 'hours');

      const event: Schedule = {
        start: this.startString,
        end: tEnd.format('YYYY-MM-DD[T]HH:mm'),
        pay_rate: this.addForm.value.pay_rate,
        created: new Date(),
        completed: '1',
        location_id: this.addForm.value.location_id,
        employee_id: this.addForm.value.employee_id,
        site: this.authService.user.site.id,
      };
      this.scheduleForms.push(event);
    });

  }

  onSave() {
    this.scheduleForms.forEach(event => {
      this.apiService.createSchedule(event)
        .subscribe(data => {
          this.insertCount++;
        },
        error => {
          alert(error);
          this.insertCount--;
        });
    });
    this.displayStatus = true;
    this.scheduleFormLabel = 'Click the reset button below to add more schedules.';
  }

  onReset() {
    this.displayStatus = false;
    this.scheduleForms = [];
    this.insertCount = 0;
    this.scheduleFormLabel = 'Add more schedules to a single employee at a single location for the current month.';
  }


}
