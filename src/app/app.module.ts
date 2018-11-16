import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { LocationsComponent } from './location-list/locations.component';
import { LocationCreateComponent } from './location-create/location-create.component';
import { ScheduleCreateComponent } from './schedule-create/schedule-create.component';
import { ScheduleUpdateComponent } from './schedule-create/schedule-update.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MycalComponent } from './mycal/mycal.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RepeaterComponent } from './repeater/repeater.component';
import { LoginComponent } from './login/login.component';
import { InterceptService } from './services/intercept.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';

import { ChartModule } from 'angular-highcharts';
import { ChartComponent } from './chart/chart.component';
import { MaterialModule } from './shared/material.module';
import { EmployeesComponent } from './employee-list/employees.component';
import { ClassesComponent } from './classes/classes.component';
import { RegisterComponent } from './login/register.component';
import { AlertComponent } from './shared/alert.component';
import { HeaderComponent } from './shared/header.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeCreateComponent,
    LocationsComponent,
    LocationCreateComponent,
    ScheduleCreateComponent,
    ScheduleUpdateComponent,
    MycalComponent,
    RepeaterComponent,
    LoginComponent,
    ChartComponent,
    EmployeesComponent,
    ClassesComponent,
    RegisterComponent,
    AlertComponent,
    HeaderComponent,
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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChartModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [InterceptService, { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true }, AlertService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
