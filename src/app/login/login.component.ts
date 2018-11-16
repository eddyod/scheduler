import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  isLoggedIn$: Observable<boolean>;                  // {1}


  constructor(public authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // reset login status
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }


  login() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }

    this.loading = true;
    // this.authService.login({ 'username': this.addForm.value.username, 'password': this.addForm.value.password });
    this.authService.login(this.addForm.value.username, this.addForm.value.password)
      .pipe(first())
      .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
        this.alertService.success('You have successfully logged in.')
      },
      error => {
        this.alertService.error("The username and/or password were incorrect.");
        this.loading = false;
      });
  }

  refreshToken() {
    this.authService.refreshToken();
  }

  logout() {
    this.authService.logout();
    this.loading = false;
    this.alertService.success('You have successfully logged out.')
  }



}
