import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { APIService } from '../services/api.service';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';

import {
  FormGroup, FormBuilder, Validators,
} from '@angular/forms';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public teachers: Array<object> = [];
  public chart: Chart;
  addForm: FormGroup;
  class_month: number;
  class_year: number;


  constructor(private apiService: APIService,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      class_month: ['', Validators.required],
      class_year: ['', Validators.required],
    });
    const params = new HttpParams()
      .set('m', '10')
      .set('y', '2018');
    this.apiService.getAttendance(params).subscribe(data => { this.buildChart(data as object[]) });

  }

  refreshChart() {
    let params = new HttpParams()
    .set('m', '10')
    .set('y', '2018');
    this.apiService.getAttendance(params).subscribe(data => { this.buildChart(data as object[]) });
  }


  buildChart(data) {
    console.log(data);
    let names = [];
    let shows = [];
    let noshows = []
    data.forEach(teacher => {
      names.push(teacher.teacher);
      shows.push(teacher.showed_up);
      noshows.push(teacher.no_show);
    });

    this.chart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Teacher completion rate'
      },
      credits: {
        enabled: false
      },
      xAxis: { categories: names },

      yAxis: {
        min: 0, title: {
          text: 'Classes completed/missed',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ('#FFFFFF'),
        shadow: true
      },

      series: [
        {
          name: 'Showed up',
          data: shows,
        },
        {
          name: 'Missed',
          data: noshows,
        },
      ]
    });
  }


  add() {
    console.log(this.teachers);
  }



}
