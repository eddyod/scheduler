import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employee-list/employees.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { LocationsComponent } from './location-list/locations.component';
import { LocationCreateComponent } from './location-create/location-create.component';
import { ClassesComponent } from './classes/classes.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleUpdateComponent } from './schedule-create/schedule-update.component';
import { MycalComponent } from './mycal/mycal.component';
import { RepeaterComponent } from './repeater/repeater.component';
import { LoginComponent } from './login/login.component';
import { ChartComponent } from './chart/chart.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-employee',
    component: EmployeeCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-schedule',
    component: ScheduleUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-schedule',
    component: ScheduleCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'locations',
    component: LocationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-location',
    component: LocationCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mycal',
    component: MycalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'repeater',
    component: RepeaterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chart',
    component: ChartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'classes',
    component: ClassesComponent,
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
