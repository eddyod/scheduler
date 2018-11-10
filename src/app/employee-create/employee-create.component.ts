import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Employee } from '../models/employee';
import { User } from '../models/user';
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
  user: any;

  constructor(
    private apiService: APIService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address1: ['', Validators.required],
      is_active: ['', Validators.required],
    });
    /*
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address1: ['', Validators.required],
      active: ['', Validators.required],
      user: this.formBuilder.group({
        email: ['', Validators.required]
      }),
    });
    */
    const id = localStorage.getItem('id');
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
    // this.addForm.value.created_id = localStorage.getItem('user_id');
    // this.addForm.value.created = new Date();
    this.apiService.createEmployee(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['employees']);
      },
        error => {
          alert('There was an error inserting the data.');
        });
  }

  onUpdate() {
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
