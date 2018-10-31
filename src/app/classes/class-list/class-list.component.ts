import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ClassesDataSource } from '../../services/classes.data.source';
import { ScheduleEvent } from '../../models/scheduleEvent';
import { APIService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';



@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent implements OnInit {

  displayedColumns = ['start', 'end', 'teacher', 'school', 'completed', 'actions'];
  apiDatabase: APIService | null;
  dataSource: ClassesDataSource | null;
  index: number;
  id: number;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private apiService: APIService,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  refresh() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  public loadData() {
    this.apiDatabase = new APIService(this.http);
    this.dataSource = new ClassesDataSource(this.apiDatabase, this.paginator, this.sort);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });

  }


  ngOnInit() {
    this.loadData();
  }


  editSchedule(schedule: ScheduleEvent): void {
    localStorage.removeItem('id');
    localStorage.setItem('id', schedule.id.toString());
    localStorage.setItem('school_id', schedule.school.id.toString());
    localStorage.setItem('teacher_id', schedule.teacher.id.toString());
    this.router.navigate(['update-schedule']);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  updateCompleted(schedule: ScheduleEvent): void {
    if (schedule.completed) {
      schedule.completed = false;
    } else {
      schedule.completed = true;
    }
    schedule.teacher_id = schedule.teacher.id;
    schedule.school_id = schedule.school.id;
    this.apiService.updateSchedule(schedule).subscribe();
    this.refreshTable();
    this.snackBar.open('Class updated.', schedule.teacher.name + ' at ' + schedule.school.name, {
      duration: 1000
    });

  }

  deleteRow(i: number, id: number): void {
    this.index = i;
    this.id = id;
    const foundIndex = this.apiDatabase.dataChange.value.findIndex(x => x.id === this.id);
    // for delete we use splice in order to remove single object from DataService
    this.apiDatabase.dataChange.value.splice(foundIndex, 1);
    this.apiService.deleteSchedule(this.id)
      .subscribe();
    this.refreshTable();
    this.snackBar.open('Class deleted.', '', {
      duration: 2000
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }



}
