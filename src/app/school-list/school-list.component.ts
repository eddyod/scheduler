import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APIService} from '../api.service';
import {School} from '../school';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css']
})
export class SchoolListComponent implements OnInit {

  private schools: Array<object> = [];

  constructor(private router: Router, private apiService: APIService) {}

  ngOnInit() {
    this.getSchools();
  }

  public getSchools() {
    this.apiService.getSchools().subscribe((data: Array<object>) => {
      this.schools = data;
      console.log(data);
    });
  }

  deleteSchool(school: School): void {
    this.apiService.deleteSchool(school.id)
      .subscribe(data => {
        this.schools = this.schools.filter(u => u !== school);
      });
  }

  editSchool(school: School): void {
    localStorage.removeItem('editSchoolId');
    localStorage.setItem('id', school.id.toString());
    this.router.navigate(['create-school']);
  }

  addSchool(): void {
    this.router.navigate(['create-school']);
  }


}
