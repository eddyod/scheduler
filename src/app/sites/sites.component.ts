import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { merge } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';
import { NewSiteDialogComponent } from './new-site-dialog.component';
import { SiteDataSource } from '../services/site.datasource';
import { Site } from '../models/site';


@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  site: Site;
  dataSource: SiteDataSource;
  displayedColumns = ['id', 'name', 'email', 'actions'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;


  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.authService.title = 'List Sites';
  }


  ngOnInit() {
    this.dataSource = new SiteDataSource(this.apiService);
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


  openAddSiteDialog(): void {
    const dialogRef = this.dialog.open(NewSiteDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (result) {
        this.openSnackBar('Site added', 'Navigate')
          .onAction().subscribe(() => {
            this.router.navigate(['/sites', result.id]);
          });
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
