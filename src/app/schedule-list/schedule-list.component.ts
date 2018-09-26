import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from '../api.service';
import {Schedule} from '../schedule';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

    private schedules: Array<object> = [];

    constructor(private router: Router, private apiService: APIService) {}

    ngOnInit() {
      this.getSchedules();
    }

    public getSchedules() {
      this.apiService.getSchedules().subscribe((data: Array<object>) => {
        this.schedules = data;
      });
    }

    deleteSchedule(schedule: Schedule): void {
      this.apiService.deleteSchedule(schedule.id)
        .subscribe(data => {
          this.schedules = this.schedules.filter(u => u !== schedule);
        });
        this.router.navigate(['schedules']);
    }

    editSchedule(schedule: Schedule): void {
      localStorage.removeItem('id');
      localStorage.setItem('id', schedule.id.toString());
      localStorage.setItem('school_id', schedule.school.id.toString());
      localStorage.setItem('teacher_id', schedule.teacher.id.toString());
      this.router.navigate(['create-schedule']);
    }

    addSchedule(): void {
      localStorage.removeItem('id');
      this.router.navigate(['create-schedule']);
    }


}
