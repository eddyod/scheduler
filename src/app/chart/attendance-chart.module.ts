import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from '../shared/material.module';
import { InterceptService } from '../services/intercept.service';
import { AuthGuard } from '../services/auth.guard';
import { ChartComponent } from './chart.component';

const routes: Routes = [
  { path: '', component: ChartComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    ChartModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChartComponent],
  providers: [InterceptService, { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true }, AuthGuard],

})
export class AttendanceChartModule { }
