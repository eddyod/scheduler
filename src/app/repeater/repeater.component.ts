import { Component, OnInit } from '@angular/core';
import { RRule } from 'rrule';
import { Schedule } from '../models/schedule';
import { APIService } from '../services/api.service';
import {
  FormGroup, FormBuilder, Validators,
  FormControl, FormArray, ValidatorFn
} from '@angular/forms';
import * as moment from 'moment';
import { School } from '../models/school';
import { Teacher } from '../models/teacher';


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

  displayCheck = false;
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
  scheduleFormLabel = 'Create Classes';
  private startDate: Date;
  private endDate: Date;
  private startString: string;
  // drop downs
  public teachers: Array<Object> = [];
  public schools: Array<School> = [];

  constructor(
    private apiService: APIService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // controls[2].setValue(true);
    const controls = this.byweekdays.map(c => new FormControl(false));
    this.addForm = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      duration: ['', Validators.required],
      school_id: ['', Validators.required],
      teacher_id: ['', Validators.required],
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

    this.apiService.findSchools('', 'name', 100, 0).subscribe((results: School[]) => {
      this.schools = results['results']
    });

    this.apiService.findTeachers('', 'name', 100, 0).subscribe((results: Teacher[]) => {
      this.teachers = results['results']
    });

  }


  checkTime() {
    this.displayCheck = true;
    this.displayStatus = false;
    const selectedOrderIds = this.addForm.value.byweekdays
      .map((v, i) => v ? this.byweekdays[i].id : null)
      .filter(v => v !== null);
    this.scheduleForms = [];
    this.startDate = new Date(this.addForm.value.start + timezoneOffsetString);
    this.endDate = new Date(this.addForm.value.end + timezoneOffsetString);
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
        start: this.startString, end: tEnd.format('YYYY-MM-DD[T]HH:mm'),
        school_id: this.addForm.value.school_id,
        teacher_id: this.addForm.value.teacher_id,
        pay_rate:  this.addForm.value.pay_rate,
        createdBy: parseInt(localStorage.getItem('user_id'), 10),
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
    this.displayCheck = false;
  }

  onReset() {
    this.displayCheck = false;
    this.displayStatus = false;
    this.scheduleForms = [];
    this.insertCount = 0;
  }


}
