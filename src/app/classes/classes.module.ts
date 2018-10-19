import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassListComponent } from './class-list/class-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ClassesRoutingModule
  ],
  declarations: [ClassListComponent]
})
export class ClassesModule { }
