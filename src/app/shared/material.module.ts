import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIcon,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIcon,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIcon
  ],
})
export class MaterialModule { }
