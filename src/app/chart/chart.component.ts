import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Attendance } from '../models/attendance';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  series: Observable<Array<Attendance>>;
  API_URL = environment.apiEndpoint + '/attendance';


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
      categories: ['P1', 'P2', 'P3', 'P4']
    },

    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Number of scheduled classes'
      }
    },

    tooltip: {
      formatter: function() {
        return '<b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          'Total: ' + this.point.stackTotal;
      }
    },

    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },

    series: [{ name: "stuff", data: this.series }];

  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchSeries();
    console.log(this.series);
  }

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
    // this.chart.addSerie({name:'Fast Eddy', data:[2,10,4,7,8], stack:'male'});
  }

  fetchSeries(): void {

    const params = new HttpParams()
      .set('start_gte','2018-10')
      .set('start_lte','2018-11');


    this.series = this.http
      .get(this.API_URL, {params})
      .pipe(map((results: Attendance[]) => {
      //.pipe(
      //map(({ results }: { results: Object[] }) => {
        return results.map((attend: Attendance) => {

          return {
            id: attend.id,
            teacher: attend.teacher,
            school: attend.school,
            class_date: attend.class_date,
            showed_up: attend.showed_up,
            no_show: attend.no_show,
          };
        });
      })
      );
  }


}
