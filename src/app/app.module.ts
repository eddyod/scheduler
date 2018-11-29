import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InterceptService } from './services/intercept.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

import { MaterialModule } from './shared/material.module';
import { AlertComponent } from './shared/alert.component';
import { HeaderComponent } from './shared/header.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgbModalModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [InterceptService, { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
    AlertService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
