import { Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleEvent } from '../models/scheduleEvent';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { APIService } from '../services/api.service';


@Component({
  selector: 'app-smlist',
  templateUrl: './smlist.component.html',
  styleUrls: ['./smlist.component.css']
})
export class SmlistComponent {

  displayedColumns = ['start', 'end', 'completed', 'teacher',  'school'];
  dataSource: MatTableDataSource<ScheduleEvent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: APIService) {
    this.apiService.getClasses().subscribe(data => { this.buildTable(data as ScheduleEvent[]); });
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


}
