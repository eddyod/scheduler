import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { fromEvent } from 'rxjs';
import { APIService } from '../services/api.service';
import { TeacherDataSource } from '../services/teacher.datasource';
import { Teacher } from '../models/teacher';
import { merge } from 'rxjs';
import { tap, map } from 'rxjs/operators';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teacher: Teacher;
  dataSource: TeacherDataSource;
  displayedColumns = ['id', 'phone', 'email', 'address1', 'isActive'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;


  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.dataSource = new TeacherDataSource(this.apiService);
    this.dataSource.loadTeachers('', 20, 0);
  }

  ngAfterViewInit() { }

  // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  /*
    fromEvent(this.input.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.paginator.pageIndex = 0;
        this.loadTeachersPage();
        //this.dataSource.filter = this.filter.nativeElement.value;
      });



  merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.loadTeachersPage())
    )
    .subscribe();

}
*/

  loadTeachersPage() {
    this.dataSource.loadTeachers(
      this.input.nativeElement.value,
      this.paginator.pageSize,
      this.paginator.pageIndex
    );
  }


}
