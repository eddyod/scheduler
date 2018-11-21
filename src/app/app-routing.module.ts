import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'account/home', pathMatch: 'full'},
  {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  },
  {
    path: 'mycal',
    loadChildren: './mycal/mycal.module#MycalModule'
  },
  {
    path: 'chart',
    loadChildren: './chart/attendance-chart.module#AttendanceChartModule'
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
  },
  // { path: '', component: HomeComponent }
  { path: '**', redirectTo: 'home' } // this needs to be after other routes

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
