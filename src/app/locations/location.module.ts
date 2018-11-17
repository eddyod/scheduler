import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocationsComponent } from './locations.component';
import { LocationCreateComponent } from './location-create.component';


const routes: Routes = [
  { path: '', component: LocationsComponent },
  { path: 'create', component: LocationCreateComponent },
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
  declarations: [LocationsComponent, LocationCreateComponent]
})
export class LocationModule { }
