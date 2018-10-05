import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TeacherListComponent} from './teacher-list/teacher-list.component';
import {TeacherCreateComponent} from './teacher-create/teacher-create.component';
import {SchoolListComponent} from './school-list/school-list.component';
import {SchoolCreateComponent} from './school-create/school-create.component';
import {ScheduleListComponent} from './schedule-list/schedule-list.component';
import {ScheduleCreateComponent} from './schedule-create/schedule-create.component';
import {ScheduleUpdateComponent} from './schedule-create/schedule-update.component';
import {MycalComponent} from './mycal/mycal.component';
import {RepeaterComponent} from './repeater/repeater.component';


const routes: Routes = [
  {path: '', redirectTo: 'teachers', pathMatch: 'full'},
  {
    path: 'teachers',
    component: TeacherListComponent
  },
  {
    path: 'create-teacher',
    component: TeacherCreateComponent
  },
  {
    path: 'schedules',
    component: ScheduleListComponent
  },
  {
    path: 'update-schedule',
    component: ScheduleUpdateComponent
  },
  {
    path: 'create-schedule',
    component: ScheduleCreateComponent
  },
  {
    path: 'schools',
    component: SchoolListComponent
  },
  {
    path: 'create-school',
    component: SchoolCreateComponent
  },
  {
    path: 'mycal',
    component: MycalComponent
  },
  {
    path: 'repeater',
    component: RepeaterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
