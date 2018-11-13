import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      phone: ['', Validators.required],
      address1: ['', Validators.required],
      active: ['', Validators.required]
    });

    const id = localStorage.getItem('id');
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
    this.addForm.value.site = parseInt(localStorage.getItem('site_id'), 10),
    this.apiService.createLocation(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['locations']);
      },
        error => {
          alert(error);
        });
  }
  onUpdate() {
    this.addForm.value.site = parseInt(localStorage.getItem('site_id'), 10),
    this.addForm.value.created_id = localStorage.getItem('user_id');
    this.apiService.updateLocation(this.addForm.value).subscribe(data => {
      this.router.navigate(['locations']);
    },
      error => {
        alert(error);
      });
  }

}
