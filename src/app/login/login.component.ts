import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any;
  addForm: FormGroup;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });



  }


  login() {
    this.authService.login({ 'username': this.addForm.value.username, 'password': this.addForm.value.password });
  }

  refreshToken() {
    this.authService.refreshToken();
  }

  logout() {
    this.authService.logout();
  }

}
