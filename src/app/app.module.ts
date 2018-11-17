import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

import { MycalComponent } from './mycal/mycal.component';
import { LoginComponent } from './login/login.component';
import { InterceptService } from './services/intercept.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

import { ChartComponent } from './chart/chart.component';
import { MaterialModule } from './shared/material.module';
import { RegisterComponent } from './login/register.component';
import { AlertComponent } from './shared/alert.component';
import { HeaderComponent } from './shared/header.component';
import { UserinfoComponent } from './login/userinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    MycalComponent,
    LoginComponent,
    ChartComponent,
    RegisterComponent,
    AlertComponent,
    HeaderComponent,
    UserinfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ChartModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [InterceptService, { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true }, AlertService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
