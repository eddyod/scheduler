import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassListComponent } from './class-list/class-list.component';

const routes: Routes = [
  {path: 'classes', component: ClassListComponent},
  {path: '**', redirectTo: 'classes'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
