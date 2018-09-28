import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FlatpickrModule} from 'angularx-flatpickr';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TeacherListComponent} from './teacher-list/teacher-list.component';
import {TeacherCreateComponent} from './teacher-create/teacher-create.component';
import {SchoolListComponent} from './school-list/school-list.component';
import {SchoolCreateComponent} from './school-create/school-create.component';
import {ScheduleListComponent} from './schedule-list/schedule-list.component';
import {ScheduleCreateComponent} from './schedule-create/schedule-create.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {MycalComponent} from './mycal/mycal.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherListComponent,
    TeacherCreateComponent,
    SchoolListComponent,
    SchoolCreateComponent,
    ScheduleListComponent,
    ScheduleCreateComponent,
    MycalComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
