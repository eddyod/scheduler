import {Component, OnInit} from '@angular/core';
import {APIService} from '../api.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {School} from '../school';


@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit {

  title = 'Add School';
  memberFrm: FormGroup;

  constructor(private apiService: APIService, private formBuilder: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.memberFrm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  addMember(school) {
    this.apiService.createSchool(school);
  }

  ngOnInit() {
  }

}
