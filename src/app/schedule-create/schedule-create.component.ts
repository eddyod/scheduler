import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { Schedule } from '../schedule';

// Create a rule:
const rweekly = new RRule({
  freq: RRule.WEEKLY,
})

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
  private junk_date: Date;
  private junk_string: string;

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
    rule.options.dtstart = new Date(this.addForm.value.start);
    console.log(rule.all());
    this.rules = rule.all();
    this.rules.forEach(rule => {
      this.junk_string = moment(rule).format("YYYY-MM-DD[T]HH:mm");
      let event: Schedule = {start: this.junk_string, end: this.junk_string,
        school_id: this.addForm.value.school_id,
        teacher_id: this.addForm.value.teacher_id,
        createdBy: this.addForm.value.createdBy};
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
