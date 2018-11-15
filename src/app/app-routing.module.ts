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
import { RegisterComponent } from './login/register.component';
import { ChartComponent } from './chart/chart.component';

import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  {
    path: 'create-employee',
    component: EmployeeCreateComponent,
  },
  {
    path: 'update-schedule',
    component: ScheduleUpdateComponent,
  },
  {
    path: 'create-schedule',
    component: ScheduleCreateComponent,
  },
  {
    path: 'locations',
    component: LocationsComponent,
  },
  {
    path: 'create-location',
    component: LocationCreateComponent,
  },
  {
    path: 'mycal',
    component: MycalComponent,
  },
  {
    path: 'repeater',
    component: RepeaterComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'chart',
    component: ChartComponent,
  },
  {
    path: 'classes',
    component: ClassesComponent,
  },
  {
    path: 'sites',
    loadChildren: './sites/sites.module#SitesModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
