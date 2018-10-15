import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { APIService } from '../services/api.service';
import { Attendance } from '../models/attendance';




@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  // teachers = [];
  public teachers: Array<object> = [];
  // teachers: Observable<Array<object>>;


  chart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Teachers showing up per month'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        }
      }
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Number of scheduled classes'
      }
    },

    series: [{
      name: 'Population',
      data: [],
    }]

  });

  constructor(private apiService: APIService) { }


  ngOnInit() {
    const params = new HttpParams()
      .set('start_gte', '2018-10-01')
      .set('start_lte', '2018-10-31');
    this.apiService.getAttendance(params).subscribe((data: Array<object>) => {
      this.teachers = data;
    });
    console.log(this.teachers);
  }



  add() {
    //this.getSchools().subscribe((data: Array<object>) => {
    //   this.teachers = data;
    // });
    //this.fetchSeries();
    console.log(this.teachers);
  }


  getSchools() {
    const params = new HttpParams()
      .set('start_gte', '2018-10-01')
      .set('start_lte', '2018-10-31');
    //    return this.http.get(this.API_URL, { params });
  }


  fetchSeries() {
    const params = new HttpParams()
      .set('start_gte', '2018-10-01')
      .set('start_lte', '2018-10-31');
    /*
  this.http.get(this.API_URL, { params })
    .subscribe((results: Attendance[]) => {
      results.forEach(teacher => {
        this.teachers.push([teacher.teacher, teacher.showed_up]);
      })
    })
*/
    // this.series.forEach(teacher => {
    //  this.teachers.push([teacher.teacher, teacher.showed_up])
    // })
  }
}
