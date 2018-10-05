import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { ScheduleEvent } from '../scheduleEvent';

import { Observable, Subject } from 'rxjs';
import { debounceTime, merge, share, startWith, switchMap } from 'rxjs/operators';
import { Page } from '../page';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent {

  public schedules: Array<object> = [];
  filterForm: FormGroup;
  page: Observable<Page<ScheduleEvent>>;
  pageUrl = new Subject<string>();
  // drop downs
  public teachers: Array<object> = [];
  public schools: Array<object> = [];


  constructor(private router: Router, private apiService: APIService) {
    this.filterForm = new FormGroup({
      school_id: new FormControl(),
      teacher_id: new FormControl()
    });

    this.page = this.filterForm.valueChanges.pipe(
      debounceTime(200),
      startWith(this.filterForm.value),
      merge(this.pageUrl),
      switchMap(urlOrFilter => this.apiService.listSchedules(urlOrFilter)),
      share()
    );

    this.apiService.getSchools().subscribe((data: Array<object>) => {
      this.schools = data;
    });

    this.apiService.getTeachers().subscribe((data: Array<object>) => {
      this.teachers = data;
    });


  }

  editSchedule(schedule: ScheduleEvent): void {
    localStorage.removeItem('id');
    localStorage.setItem('id', schedule.id.toString());
    localStorage.setItem('school_id', schedule.school.id.toString());
    localStorage.setItem('teacher_id', schedule.teacher.id.toString());
    this.router.navigate(['update-schedule']);
  }

  addSchedule(): void {
    localStorage.removeItem('id');
    this.router.navigate(['create-schedule']);
  }

  deleteSchedule(schedule: ScheduleEvent): void {
    this.apiService.deleteSchedule(schedule.id)
      .subscribe(data => {
        this.schedules = this.schedules.filter(u => u !== schedule);
      });
    this.router.navigate(['schedules']);
  }


  onPageChanged(url: string) {
    this.pageUrl.next(url);
  }

}
