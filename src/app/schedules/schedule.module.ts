import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SchedulesComponent } from './schedules.component';
import { ScheduleCreateComponent } from './schedule-create.component';
import { ScheduleUpdateComponent } from './schedule-update.component';
import { RepeaterComponent } from './repeater.component';
import { InterceptService } from '../services/intercept.service';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  { path: '', component: SchedulesComponent, canActivate: [AuthGuard] },
  { path: 'create', component: ScheduleCreateComponent, canActivate: [AuthGuard]  },
  { path: 'update', component: ScheduleUpdateComponent, canActivate: [AuthGuard]  },
  { path: 'repeater', component: RepeaterComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SchedulesComponent, ScheduleCreateComponent, ScheduleUpdateComponent, RepeaterComponent],
  providers: [InterceptService, { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true }, AuthGuard],
})
export class ScheduleModule { }
