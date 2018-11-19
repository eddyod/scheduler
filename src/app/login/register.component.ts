import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../services/auth.service';
// import { AlertService } from '../services/alert.service';

@Component({ templateUrl: 'register.component.html' })

export class RegisterComponent implements OnInit {
  addForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.authService.title = 'Registration';
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  register() {
    this.authService.register(this.addForm.value)
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          this.openSnackBar('You have sucessfully registered. ', 'OK!');
          this.router.navigate(['/login']);
        },
        error => {
          // this.alertService.error(error);
          this.openSnackBar('There was an error with the registration. ', '');
        });
  }
}
