import { Component, ViewChild } from '@angular/core';
import { ScheduleEvent } from '../../models/scheduleEvent';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
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

  displayedColumns = ['start', 'end', 'completed', 'teacher', 'school', 'select'];
  dataSource: MatTableDataSource<ScheduleEvent>;
  selection = new SelectionModel<ScheduleEvent>(allowMultiSelect, initialSelection);


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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkDelete() {
    console.log(this.selection.selected.forEach(row => console.log(row)));
    this.selection.clear();
  }



}
