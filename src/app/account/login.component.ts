import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(public authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.authService.title = 'User Login';
  }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // reset login status
    this.authService.logout();
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/account/info';
    this.returnUrl = '/account/info';
  }


  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.addForm.value.email, this.addForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          // this.authService.loggedIn.next(true);
          this.router.navigate([this.returnUrl]);
          this.alertService.success('You have successfully logged in.');
        },
        error => {
          this.alertService.error('The email and/or password were incorrect.');
          this.loading = false;
        });
  }


}
