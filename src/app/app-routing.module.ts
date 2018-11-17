import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MycalComponent } from './mycal/mycal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ChartComponent } from './chart/chart.component';
import { UserinfoComponent } from './login/userinfo.component';

import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'mycal',
    component: MycalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'userinfo',
    component: UserinfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'chart',
    component: ChartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees',
    loadChildren: './employees/employee.module#EmployeeModule',
  },
  {
    path: 'locations',
    loadChildren: './locations/location.module#LocationModule',
  },
  {
    path: 'schedules',
    loadChildren: './schedules/schedule.module#ScheduleModule',
  },
  {
    path: 'sites',
    loadChildren: './sites/sites.module#SitesModule',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
