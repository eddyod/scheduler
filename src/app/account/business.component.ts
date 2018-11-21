import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
// import { User } from '../models/user';
// import { Site } from '../models/site';

@Component({ templateUrl: 'business.component.html' })

export class BusinessComponent implements OnInit {
  public form1: FormGroup;
  public form2: FormGroup;
  public displayForm1 = true;
  public displayForm2 = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.authService.title = 'User registration for a new business.';
  }

  ngOnInit() {
    // part for user and part for site
    this.form1 = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.displayForm1 = true;
  }

  public registerUser() {
    this.authService.register(this.form1.value)
      .subscribe(
        data => {
          this.alertService.success('User Registration successful', true);
          this.displayForm1 = false;
          this.displayForm2 = true;
        },
        error => {
          this.alertService.error(error.message);
        });
  }

  public registerSite() {
    this.authService.registerSite(this.form2.value)
      .subscribe(
        data => {
          this.alertService.success('Business registration successful', true);
          this.displayForm1 = false;
          this.displayForm2 = false;
        },
        error => {
          this.alertService.error(error);
        });
  }

}
