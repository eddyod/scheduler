import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from '../api.service';
import {School} from '../school';

import { Observable, Subject } from 'rxjs';
import { debounceTime, merge, share, startWith, switchMap } from 'rxjs/operators';
import { Page } from '../page';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {

  public schools: Array<object> = [];
  filterForm: FormGroup;
  page: Observable<Page<School>>
  pageUrl = new Subject<string>();


  constructor(private router: Router, private apiService: APIService) {
    this.filterForm = new FormGroup({
      name: new FormControl()
    });

    this.page = this.filterForm.valueChanges.pipe(
      debounceTime(200),
      startWith(this.filterForm.value),
      merge(this.pageUrl),
      switchMap(urlOrFilter => this.apiService.listSchools(urlOrFilter)),
      share()
    );

  }

  ngOnInit() {
    // this.getSchools();
  }

  public getSchools() {
    this.apiService.getSchools().subscribe((data: Array<object>) => {
      this.schools = data;
    });
  }

  deleteSchool(school: School): void {
    this.apiService.deleteSchool(school.id)
      .subscribe(data => {
        this.schools = this.schools.filter(u => u !== school);
      });
      this.router.navigate(['schools']);
  }

  editSchool(school: School): void {
    localStorage.removeItem('id');
    localStorage.setItem('id', school.id.toString());
    this.router.navigate(['create-school']);
  }

  addSchool(): void {
    localStorage.removeItem('id');
    this.router.navigate(['create-school']);
  }


}
