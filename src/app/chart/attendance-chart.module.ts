import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChartModule } from 'angular-highcharts';
import { MaterialModule } from '../shared/material.module';

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
  declarations: [ChartComponent]
})
export class AttendanceChartModule { }
