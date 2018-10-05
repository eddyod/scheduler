import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { Schedule } from '../schedule';

const timezoneOffset = new Date().getTimezoneOffset();
const hoursOffset = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(2, '0');
const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
const direction = timezoneOffset > 0 ? '-' : '+';
// const timezoneOffsetString = `T00:00:00${direction}${hoursOffset}${minutesOffset}`;
const timezoneOffsetString = `${direction}${hoursOffset}${minutesOffset}`;

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.css']
})
export class ScheduleCreateComponent implements OnInit {

  title = 'Add Schedule';
  displayButton = true;
  displayCheck = false;
  addForm: FormGroup;
  scheduleFormLabel = 'Add Schedule';
  scheduleButton = 'Save';
  // drop downs
  public teachers: Array<object> = [];
  public schools: Array<object> = [];
  public rules: Array<object> = [];
  public scheduleForms: Array<Schedule> = [];
  private startDate: Date;
  private endDate: Date;
  private startString: string;
  private endString: string;

  constructor(
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private router: Router) { }


  ngOnInit() {
    // this.dateTimeAdapter.setLocale('en-GB');
    this.addForm = this.formBuilder.group({
      id: [],
      start: ['', Validators.required],
      end: ['', Validators.required],
      school_id: ['', Validators.required],
      teacher_id: ['', Validators.required],
      createdBy: ['', Validators.required],
      rruleText: [''],
    });

    const id = localStorage.getItem('id');
    if (+id > 0) {
      this.apiService.getScheduleById(+id).subscribe(data => {
        this.addForm.patchValue(data);
      });
      this.addForm.controls['school_id'].setValue(localStorage.getItem('school_id'));
      this.addForm.controls['teacher_id'].setValue(localStorage.getItem('teacher_id'));
      this.displayButton = false;
      this.scheduleFormLabel = 'Edit Schedule';
      this.scheduleButton = 'Update';
    }



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

  onSave() {
    this.addForm.value.start = moment(this.addForm.value.start).format("YYYY-MM-DD[T]HH:mm");
    this.addForm.value.end = moment(this.addForm.value.end).format("YYYY-MM-DD[T]HH:mm");
    this.apiService.createSchedule(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['schedules']);
      },
        error => {
          alert(error);
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
