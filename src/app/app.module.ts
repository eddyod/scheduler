import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TeacherListComponent} from './teacher-list/teacher-list.component';
import {TeacherCreateComponent} from './teacher-create/teacher-create.component';
import {SchoolListComponent} from './school-list/school-list.component';
import {SchoolCreateComponent} from './school-create/school-create.component';
import {ScheduleListComponent} from './schedule-list/schedule-list.component';
import {ScheduleCreateComponent} from './schedule-create/schedule-create.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherListComponent,
    TeacherCreateComponent,
    SchoolListComponent,
    SchoolCreateComponent,
    ScheduleListComponent,
    ScheduleCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
