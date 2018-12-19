import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {

  title = 'Add School';
  displayButton = true;
  addForm: FormGroup;
  locationFormLabel = 'Add School';
  locationButton = 'Save';

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.authService.title = 'Create Location';
  }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', Validators.required],
      address1: ['', Validators.required],
      active: ['', Validators.required]
    });

    const id = sessionStorage.getItem('id');
    if (+id > 0) {
      this.apiService.getLocationById(+id).subscribe(data => {
        this.addForm.patchValue(data);
      });
      this.displayButton = false;
      this.locationFormLabel = 'Edit Location';
      this.locationButton = 'Update';
    }

  }

  onSave() {
    this.addForm.value.site = this.authService.user.site.id;
    this.addForm.value.created_id = this.authService.user.id;
    this.apiService.createLocation(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['locations']);
      },
      error => {
        alert(error);
      });
  }
  onUpdate() {
    this.addForm.value.site = this.authService.user.site.id;
    this.addForm.value.created_id = this.authService.user.id;
    this.apiService.updateLocation(this.addForm.value).subscribe(data => {
      this.router.navigate(['locations']);
    },
      error => {
        alert(error);
      });
  }
}
