import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';
import { AlertService } from '../services/alert.service';

@Component({ templateUrl: 'business.component.html' })

export class BusinessComponent implements OnInit {
  public form1: FormGroup;
  public form2: FormGroup;
  public displayForm1 = true;
  public displayForm2 = false;
  public displayFinish = false;
  private userId: number;
  private siteId: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: APIService,
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
    this.form1.value.is_staff = 1;
    this.authService.register(this.form1.value)
      .subscribe(
        data => {
          this.alertService.success('User Registration successful', true);
          this.displayForm1 = false;
          this.userId = data['id'];
          this.buildForm2();
          this.displayForm2 = true;
        },
        error => {
          this.alertService.error(error.message);
        });
  }

  private buildForm2() {
    this.form2 = this.formBuilder.group({
      name: ['', Validators.required],
      address1: ['', Validators.required],
    });
  }

    public registerSite() {
      console.log(this.userId);
      this.form2.value.active = '1';
      this.form2.value.owner = this.userId;
      this.form2.value.created = new Date();
      this.apiService.registerSite(this.form2.value)
        .subscribe(
          data => {
            this.alertService.success('Business registration successful', true);
            this.displayForm1 = false;
            this.displayForm2 = false;
            this.displayFinish = true;
          },
          error => {
            this.alertService.error(error);
          });
    }


}
