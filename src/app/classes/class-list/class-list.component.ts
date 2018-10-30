import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
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
    private router: Router) {
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

  deleteRow(i: number, id: number): void {
    this.index = i;
    this.id = id;
    const foundIndex = this.apiDatabase.dataChange.value.findIndex(x => x.id === this.id);
    // for delete we use splice in order to remove single object from DataService
    this.apiDatabase.dataChange.value.splice(foundIndex, 1);
    this.apiService.deleteSchedule(this.id)
      .subscribe();
    this.refreshTable();
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }



}
