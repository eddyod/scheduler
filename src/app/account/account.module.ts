import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from '../services/auth.guard';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { UserinfoComponent } from './userinfo.component';
import { HomeComponent } from './home.component';
import { BusinessComponent } from './business.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'info', component: UserinfoComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserinfoComponent,
    HomeComponent,
    BusinessComponent
  ]
})
export class AccountModule { }
