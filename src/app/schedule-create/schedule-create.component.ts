import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { RRule, RRuleSet, rrulestr } from 'rrule'

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
  addForm: FormGroup;
  scheduleFormLabel = 'Add Schedule';
  scheduleButton = 'Save';
  // drop downs
  public teachers: Array<object> = [];
  public schools: Array<object> = [];
  private dstart: Date;


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
    // options = RRule.parseText('every day for 3 times');
    let rule = RRuleSet.fromText(this.addForm.value.rruleText);
    // rule.options.dtstart = new Date(Date.UTC(2000, 1, 1));
    rule.options.dtstart = this.addForm.value.start;

    this.dstart = this.addForm.value.start;
    console.log(rule.all());
    // Add a rrule to rruleSet
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
