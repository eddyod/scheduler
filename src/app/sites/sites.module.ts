import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../services/auth.guard';
import { SitesComponent } from './sites.component';
import { NewSiteDialogComponent } from './new-site-dialog.component';

const routes: Routes = [
  { path: '', component: SitesComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SitesComponent, NewSiteDialogComponent],
  entryComponents: [
    NewSiteDialogComponent
  ]
})
export class SitesModule { }
