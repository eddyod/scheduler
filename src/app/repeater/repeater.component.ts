import { Component, OnInit } from '@angular/core';
import { RRule } from 'rrule';
import { Schedule } from '../models/schedule';
import { APIService } from '../services/api.service';
import {
  FormGroup, FormBuilder, Validators,
  FormControl, FormArray, ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';


const timezoneOffset = new Date().getTimezoneOffset();
const hoursOffset = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(2, '0');
const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
const direction = timezoneOffset > 0 ? '-' : '+';
// const timezoneOffsetString = `T00:00:00${direction}${hoursOffset}${minutesOffset}`;
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
    { id: RRule.SU, name: 'Sun' },
    { id: RRule.MO, name: 'Mon' },
    { id: RRule.TU, name: 'Tue' },
    { id: RRule.WE, name: 'Wed' },
    { id: RRule.TH, name: 'Thu' },
    { id: RRule.FR, name: 'Fri' },
    { id: RRule.SA, name: 'Sat' },
  ]

  public scheduleForms: Array<Schedule> = [];
  scheduleFormLabel = 'Create Classes';
  private startDate: Date;
  private endDate: Date;
  private startString: string;
  // drop downs
  public teachers: Array<object> = [];
  public schools: Array<object> = [];
  public rules: Array<object> = [];




  constructor(
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private router: Router) {
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


    this.apiService.getSchools().subscribe((data: Array<object>) => {
      this.schools = data;
    });

    this.apiService.getTeachers().subscribe((data: Array<object>) => {
      this.teachers = data;
    });

  }


  checkTime() {
    this.displayCheck = true;
    this.displayStatus = false;
    const selectedOrderIds = this.addForm.value.byweekdays
      .map((v, i) => v ? this.byweekdays[i].id : null)
      .filter(v => v !== null);
    this.scheduleForms = [];
    //let rule = RRuleSet.fromText(this.addForm.value.rruleText);
    this.startDate = new Date(this.addForm.value.start + timezoneOffsetString);
    this.endDate = new Date(this.addForm.value.end + timezoneOffsetString);
    let rule =
      new RRule({
        freq: RRule.WEEKLY,
        dtstart: this.startDate,
        until: this.endDate,
        byweekday: selectedOrderIds
      })
    // Add a rrule to rruleSet
    this.rules = rule.all();

    rule.all().forEach(rule => {
      this.startString = moment(rule).format("YYYY-MM-DD[T]HH:mm");
      let tStart = moment(this.startString);
      let tEnd = moment(tStart).add(this.addForm.value.duration, 'hours');

      let event: Schedule = {
        start: this.startString, end: tEnd.format("YYYY-MM-DD[T]HH:mm"),
        school_id: this.addForm.value.school_id,
        teacher_id: this.addForm.value.teacher_id,
        createdBy: parseInt(localStorage.getItem('user_id')),
      };
      this.scheduleForms.push(event);
    })
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


}
