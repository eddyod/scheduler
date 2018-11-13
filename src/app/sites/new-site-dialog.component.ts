import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Site } from '../models/site';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-new-site-dialog',
  templateUrl: './new-site-dialog.component.html',
  styleUrls: ['./new-site-dialog.component.css']
})
export class NewSiteDialogComponent implements OnInit {

  site: Site;
  addForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<NewSiteDialogComponent>,
    private formBuilder: FormBuilder,
    private apiService: APIService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      email: ['', Validators.required],
    });

  }

  save() {
    this.addForm.value.created = new Date();
    this.addForm.value.owner = 1;
    this.addForm.value.active = 1;
    this.apiService.createSite(this.addForm.value).subscribe(site => {
      this.dialogRef.close(site);
    });
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
