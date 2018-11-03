import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeachersComponent } from './teacher-list/teachers.component';
import { TeacherCreateComponent } from './teacher-create/teacher-create.component';
import { SchoolsComponent } from './school-list/schools.component';
import { SchoolCreateComponent } from './school-create/school-create.component';
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
    path: 'teachers',
    component: TeachersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-teacher',
    component: TeacherCreateComponent,
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
    path: 'schools',
    component: SchoolsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-school',
    component: SchoolCreateComponent,
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
