import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { EmployeesComponent } from './employees.component';
import { EmployeeCreateComponent } from './employee-create.component';
import { InterceptService } from '../services/intercept.service';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  { path: '', component: EmployeesComponent, canActivate: [AuthGuard] },
  { path: 'create', component: EmployeeCreateComponent, canActivate: [AuthGuard]  },
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeesComponent, EmployeeCreateComponent],
  providers: [InterceptService, { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true }, AuthGuard],
})
export class EmployeeModule { }
