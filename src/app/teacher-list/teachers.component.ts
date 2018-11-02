import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatSort } from '@angular/material';
import { fromEvent } from 'rxjs';
import { APIService } from '../services/api.service';
import { TeacherDataSource } from '../services/teacher.datasource';
import { Teacher } from '../models/teacher';
import { merge } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teacher: Teacher;
  dataSource: TeacherDataSource;
  displayedColumns = ['name', 'phone', 'email', 'address1', 'isActive', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private apiService: APIService, private router: Router) { }

  ngOnInit() {
    this.dataSource = new TeacherDataSource(this.apiService);
    this.dataSource.loadTeachers('', 5, 0);
  }

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.loadTeachersPage();
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
      tap(() => this.loadTeachersPage())
      )
      .subscribe();

  }

  loadTeachersPage() {
    this.dataSource.loadTeachers(
      this.input.nativeElement.value,
      this.paginator.pageSize,
      this.paginator.pageIndex
    );
  }


    editTeacher(teacher: Teacher): void {
      localStorage.removeItem('id');
      localStorage.setItem('id', teacher.id.toString());
      this.router.navigate(['create-teacher']);
    }

    addTeacher(): void {
      localStorage.removeItem('id');
      this.router.navigate(['create-teacher']);
    }



}
