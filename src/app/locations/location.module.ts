import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LocationsComponent } from './locations.component';
import { LocationCreateComponent } from './location-create.component';
import { InterceptService } from '../services/intercept.service';
import { AuthGuard } from '../services/auth.guard';


const routes: Routes = [
  { path: '', component: LocationsComponent, canActivate: [AuthGuard] },
  { path: 'create', component: LocationCreateComponent, canActivate: [AuthGuard] },
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [LocationsComponent, LocationCreateComponent],
  providers: [InterceptService, { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true }, AuthGuard],
})
export class LocationModule { }
