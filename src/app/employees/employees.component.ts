import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatPaginator, MatSort, } from '@angular/material';
import { fromEvent } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';
import { EmployeeDataSource } from '../services/employee.datasource';
import { Employee } from '../models/employee';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employee: Employee;
  dataSource: EmployeeDataSource;
  displayedColumns = ['name', 'phone', 'email', 'address1', 'active', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private apiService: APIService,
    private authService: AuthService,
    private router: Router) {
    this.authService.title = 'List Employees';
  }

  ngOnInit() {
    this.dataSource = new EmployeeDataSource(this.apiService);
    this.dataSource.loadEmployees('', 'name', 10, 0);
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
    this.dataSource.loadEmployees(
      this.input.nativeElement.value,
      sortName,
      this.paginator.pageSize,
      this.paginator.pageIndex
    );
  }


  editEmployee(employee: Employee): void {
    sessionStorage.removeItem('id');
    sessionStorage.setItem('id', employee.id.toString());
    this.router.navigate(['employees/create']);
  }

  addEmployee(): void {
    sessionStorage.removeItem('id');
    this.router.navigate(['employees/create']);
  }

}
