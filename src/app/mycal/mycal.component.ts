import 'angular-calendar/css/angular-calendar.css';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mycal',
  templateUrl: './mycal.component.html',
  styleUrls: ['./mycal.component.css']
})
export class MycalComponent implements OnInit {
  viewDate: Date = new Date();
  events = [];
  constructor() { }

  ngOnInit() {
  }

}
