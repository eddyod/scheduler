import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit {

  title = 'Add School';
  displayButton = true;
  addForm: FormGroup;
  schoolFormLabel = 'Add School';
  schoolButton = 'Save';

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
    });

    let id = localStorage.getItem('id');
    if (+id > 0) {
      this.apiService.getSchoolById(+id).subscribe(data => {
        this.addForm.patchValue(data);
      });
      this.displayButton = false;
      this.schoolFormLabel = 'Edit School';
      this.schoolButton = 'Update';
    }

  }

  onSave() {
    console.log('Create fire');
    this.apiService.createSchool(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['schools']);
      },
        error => {
          alert(error);
        });
  }
  onUpdate() {
    console.log('Update fire');
    this.apiService.updateSchool(this.addForm.value).subscribe(data => {
      this.router.navigate(['schools']);
    },
      error => {
        alert(error);
      });
  }

}
