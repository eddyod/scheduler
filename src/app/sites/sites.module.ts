import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InterceptService } from '../services/intercept.service';
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
  providers: [InterceptService, { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true }, AuthGuard],
  entryComponents: [
    NewSiteDialogComponent
  ]
})
export class SitesModule { }
