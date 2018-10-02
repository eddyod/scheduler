import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../api.service';
import { Teacher } from '../teacher';

import { Observable, Subject } from 'rxjs';
import { debounceTime, merge, share, startWith, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { Page } from '../page';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent {

  filterForm: FormGroup;
  page: Observable<Page<Teacher>>
  pageUrl = new Subject<string>();


  constructor(private apiService: APIService, private router: Router) {
    this.filterForm = new FormGroup({
      name: new FormControl()
    });
    this.page = this.filterForm.valueChanges.pipe(
      debounceTime(200),
      startWith(this.filterForm.value),
      merge(this.pageUrl),
      switchMap(urlOrFilter => this.apiService.listTeachers(urlOrFilter)),
      share()
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

  onPageChanged(url: string) {
    this.pageUrl.next(url);
  }


}
