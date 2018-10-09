import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Teacher } from '../teacher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.css']
})
export class TeacherCreateComponent implements OnInit {

  title = 'Add Teacher';
  displayButton = true;
  addForm: FormGroup;
  teacherFormLabel = 'Add Teacher';
  teacherButton = 'Save';

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
      this.apiService.getTeacherById(+id).subscribe(data => {
        this.addForm.patchValue(data);
      });
      this.displayButton = false;
      this.teacherFormLabel = 'Edit Teacher';
      this.teacherButton = 'Update';
    }

  }

  onSave() {
    this.apiService.createTeacher(this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['teachers']);
      },
      error => {
        alert('There was an error inserting the data.');
      });
  }
  
  onUpdate() {
    this.apiService.updateTeacher(this.addForm.value).subscribe(data => {
      this.router.navigate(['teachers']);
    },
      error => {
        alert('There was an error updating the data.');
      });
  }



  deleteTeacher(teacher: Teacher): void {
    this.apiService.deleteTeacher(teacher.id)
      .subscribe(data => {
        this.router.navigate(['teachers']);
      },
      error => {
        alert('There was an error deleting the data.');
      });
  }



}
