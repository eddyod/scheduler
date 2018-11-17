import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeesComponent } from './employees.component';
import { EmployeeCreateComponent } from './employee-create.component';


const routes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'create', component: EmployeeCreateComponent },
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeesComponent, EmployeeCreateComponent]
})
export class EmployeeModule { }
