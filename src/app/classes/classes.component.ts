import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { fromEvent } from 'rxjs';
import { merge } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { APIService } from '../services/api.service';
import { ClassDataSource } from '../services/class.datasource';
import { ScheduleEvent } from '../models/scheduleEvent';



@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  class: ScheduleEvent;
  dataSource: ClassDataSource;
  displayedColumns = ['start', 'employee', 'location', 'pay_rate', 'completed', 'actions'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private apiService: APIService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource = new ClassDataSource(this.apiService);
    this.dataSource.loadRecords('', 'start', 10, 0);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadPage();
      })
      )
      .subscribe();

    this.dataSource.counter$
      .pipe(
      tap((count) => {
        this.paginator.length = count;
      })
      ).subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      tap(() => this.loadPage())
      )
      .subscribe();

  }

  loadPage() {
    let sortName: string;
    if (this.sort.direction === 'asc') {
      sortName = this.sort.active;
    } else {
      sortName = '-' + this.sort.active;
    }
    this.dataSource.loadRecords(
      this.input.nativeElement.value,
      sortName,
      this.paginator.pageSize,
      this.paginator.pageIndex
    );
  }

  editSchedule(schedule: ScheduleEvent): void {
    localStorage.removeItem('id');
    localStorage.setItem('id', schedule.id.toString());
    localStorage.setItem('location_id', schedule.location.id.toString());
    localStorage.setItem('employee_id', schedule.employee.id.toString());
    this.router.navigate(['update-schedule']);
  }


  updateCompleted(schedule: ScheduleEvent): void {
    if (schedule.completed) {
      schedule.completed = false;
    } else {
      schedule.completed = true;
    }
    schedule.employee_id = schedule.employee.id;
    schedule.location_id = schedule.location.id;
    this.apiService.updateSchedule(schedule).subscribe();
    this.openSnackBar('Class updated.', schedule.employee.name + ' at ' + schedule.location.name);
  }

  deleteRow(schedule: ScheduleEvent): void {
    this.apiService.deleteSchedule(schedule.id).subscribe();
    this.refreshTable();
    this.openSnackBar('Class deleted.', schedule.employee.name + ' at ' + schedule.location.name);
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  addClass(): void {
    localStorage.removeItem('id');
    this.router.navigate(['create-schedule']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
