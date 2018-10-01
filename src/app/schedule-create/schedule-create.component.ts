import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScheduleEvent } from '../scheduleEvent';
import { Router } from '@angular/router';


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


  constructor(
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

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

  onSave() {
    this.apiService.createSchedule(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['schedules']);
      },
        error => {
          alert(error);
        });
  }
  onUpdate() {
    this.apiService.updateSchedule(this.addForm.value).subscribe(data => {
      this.router.navigate(['schedules']);
    },
      error => {
        alert(error);
      });
  }


}
