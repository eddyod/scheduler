import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Chart } from 'angular-highcharts';

import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

const month = new Array();
month[1] = 'January';
month[2] = 'February';
month[3] = 'March';
month[4] = 'April';
month[5] = 'May';
month[6] = 'June';
month[7] = 'July';
month[8] = 'August';
month[9] = 'September';
month[10] = 'October';
month[11] = 'November';
month[12] = 'December';

const now = new Date();

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public employees: Array<object> = [];
  public chart: Chart;
  private month: number;
  public year: number;
  public monthDisplay: string;


  constructor(
    private apiService: APIService,
    private authService: AuthService,
  ) {}


  ngOnInit() {
    this.year = now.getFullYear();
    this.month = now.getMonth() + 1;

    this.monthDisplay = this.convertMonth(this.month);
    const params = new HttpParams()
      .set('site_id', this.authService.user.main_site)
      .set('m', this.month.toString())
      .set('y', this.year.toString());
    this.apiService.getAttendance(params).subscribe(data => { this.buildChart(data as object[]); });

  }

  refreshChart(m, year) {
    const params = new HttpParams()
      .set('site_id', this.authService.user.main_site)
      .set('m', m)
      .set('y', year);
    this.apiService.getAttendance(params).subscribe(data => { this.buildChart(data as object[]); });
  }

  prevChart() {
    if (this.month === 1) {
      this.month = 12;
      this.year--;
    } else {
      this.month--;
    }

    this.monthDisplay = this.convertMonth(this.month);
    this.refreshChart(this.month, this.year);
  }

  nowChart() {
    this.month = now.getMonth() + 1;
    this.monthDisplay = this.convertMonth(this.month);
    this.year = now.getFullYear();
    this.refreshChart(this.month, this.year);
  }

  nextChart() {
    if (this.month === 12) {
      this.year++;
      this.month = 1;
    } else {
      this.month++;
    }

    this.monthDisplay = this.convertMonth(this.month);
    this.refreshChart(this.month, this.year);
  }

  private convertMonth(m): string {
    return month[m];
  }


  buildChart(data) {
    const names = [];
    const shows = [];
    const noshows = [];
    data.forEach(employee => {
      names.push(employee.employee);
      shows.push(employee.showed_up);
      noshows.push(employee.no_show);
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

}
