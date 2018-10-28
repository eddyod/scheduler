import { Component, ViewChild } from '@angular/core';
import { ScheduleEvent } from '../../models/scheduleEvent';
import { MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { APIService } from '../../services/api.service';

const initialSelection = [];
const allowMultiSelect = true;


@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css']
})
export class ClassListComponent {

  displayedColumns = ['start', 'end', 'completed', 'teacher', 'school', 'delete'];
  //dataSource: MatTableDataSource<ScheduleEvent>;
  dataSource = new MatTableDataSource<ScheduleEvent>();
  selection = new SelectionModel<ScheduleEvent>(allowMultiSelect, initialSelection);
  exampleDatabase: APIService | null;
  index: number;
  id: number;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: APIService) {
    this.apiService.getClasses().subscribe(data => { this.buildTable(data as ScheduleEvent[]); });
  }

  refresh() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  buildTable(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteRow(i: number, id: number): void {
    this.index = i;
    this.id = id;
    // const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
    this.apiService.deleteSchedule(id).subscribe();
    // this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
    this.refresh();
  }

}
