import { Component, OnInit } from '@angular/core';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { Schedule } from '../schedule';
import { APIService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  addForm: FormGroup;
  public scheduleForms: Array<Schedule> = [];
  scheduleFormLabel = 'Create Classes';
  private startDate: Date;
  private endDate: Date;
  private startString: string;
  private endString: string;
  // drop downs
  public teachers: Array<object> = [];
  public schools: Array<object> = [];
  public rules: Array<object> = [];




  constructor(
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      duration: ['', Validators.required],
      school_id: ['', Validators.required],
      teacher_id: ['', Validators.required],
      createdBy: ['', Validators.required],
      rruleText: [''],
    });



    this.apiService.getSchools().subscribe((data: Array<object>) => {
      this.schools = data;
    });

    this.apiService.getTeachers().subscribe((data: Array<object>) => {
      this.teachers = data;
    });

  }

  checkTime() {
    this.scheduleForms = [];
    this.displayCheck = true;
    let rule = RRuleSet.fromText(this.addForm.value.rruleText);
    // Add a rrule to rruleSet
    this.startDate = new Date(this.addForm.value.start + timezoneOffsetString);
    this.endDate = new Date(this.addForm.value.end + timezoneOffsetString);
    // rule.options.dtstart.setDate(this.startDate.getTime());
    console.log(rule.options.dtstart);
    console.log(new Date())
    //this.rules = rule.between(this.startDate, this.endDate);
    this.rules = rule.all();
    this.rules.forEach(rule => {
    this.startString = moment(rule).format("YYYY-MM-DD[T]HH:mm");
    this.endString = moment(rule).format("YYYY-MM-DD[T]HH:mm");
      let event: Schedule = {
        start: this.startString, end: this.endString,
        school_id: this.addForm.value.school_id,
        teacher_id: this.addForm.value.teacher_id,
        createdBy: this.addForm.value.createdBy
      };
      this.scheduleForms.push(event);
    })
  }

  onSave() {}


}
