import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  title = 'Add Employee';
  displayButton = true;
  addForm: FormGroup;
  employeeFormLabel = 'Add Employee';
  employeeButton = 'Save';

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.authService.title = 'Create Employee';
}

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address1: ['', Validators.required],
      active: ['', Validators.required],
    });

    const id = sessionStorage.getItem('id');
    if (+id > 0) {
      this.apiService.getEmployeeById(+id).subscribe(data => {
        this.addForm.patchValue(data);
      });
      this.displayButton = false;
      this.employeeFormLabel = 'Edit Employee';
      this.employeeButton = 'Update';
    }

  }

  onSave() {
    this.addForm.value.site = this.authService.user.site.id;
    this.apiService.createEmployee(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['employees']);
      },
        error => {
          alert('There was an error inserting the data.');
        });
  }

  onUpdate() {
    this.addForm.value.site = this.authService.user.site.id;
    this.apiService.updateEmployee(this.addForm.value).subscribe(data => {
      this.router.navigate(['employees']);
    },
      error => {
        alert('There was an error updating the data.');
      });
  }

  deleteEmployee(employee: Employee): void {
    this.apiService.deleteEmployee(employee.id)
      .subscribe(data => {
        this.router.navigate(['employees']);
      },
        error => {
          alert('There was an error deleting the data.');
        });
  }

}
