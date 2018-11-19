import 'angular-calendar/css/angular-calendar.css';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { CalendarView } from 'angular-calendar';

import { AuthService } from '../services/auth.service';
import { ScheduleEvent } from '../models/scheduleEvent';
import { environment } from '../../environments/environment';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-mycal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mycal.component.html',
  styleUrls: ['./mycal.component.css']
})
export class MycalComponent implements OnInit {

  API_URL = environment.apiEndpoint + '/events';
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events$: Observable<Array<ScheduleEvent>>;
  activeDayIsOpen = false;
  startClass: string;
  endClass: string;

  constructor(private http: HttpClient,
  private authService: AuthService) {
    this.authService.title = 'View Monthly, Weekly, Daily Events';
  }

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];
    const params = new HttpParams()
      .set('site_id', this.authService.user.main_site)
      .set('start_gte', format(getStart(this.viewDate), 'YYYY-MM-DD') )
      .set('start_lte', format(getEnd(this.viewDate), 'YYYY-MM-DD') );

    this.events$ = this.http
      .get(this.API_URL, {params})
      // .pipe(map((results: ScheduleEvent[]) => {
      .pipe(
      map(({ results }: { results: ScheduleEvent[] }) => {
        return results.map((scheduleEvent: ScheduleEvent) => {
          this.startClass = format(scheduleEvent.start, 'MM/DD/YYYY HH:mm');
          this.endClass = format(scheduleEvent.end, 'MM/DD/YYYY HH:mm');

          return {
            id: scheduleEvent.id,
            title: scheduleEvent.employee.name + ' at '
              + scheduleEvent.location.name + ' at '
              + this.startClass + ' to ' + this.endClass,
            location_id: scheduleEvent.location_id,
            employee_id: scheduleEvent.employee_id,
            location: scheduleEvent.location,
            employee: scheduleEvent.employee,
            created: scheduleEvent.created,
            completed: scheduleEvent.completed,
            start: new Date(scheduleEvent.start),
            end: new Date(scheduleEvent.end),
            pay_rate: scheduleEvent.pay_rate,
            site: scheduleEvent.site,
            color: colors.yellow,
            meta: { scheduleEvent }
          };
        });
      })
      );
  }

  toUTCDate = function(date) {
    const _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes());
    return _utc;
  };

  toUTCString = function(date) {
    const d = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes());
    const datestring = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' +
      d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
    return datestring;
  };

  dayClicked({
    date,
    events
  }: {
      date: Date;
      events: Array<ScheduleEvent>;
    }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: ScheduleEvent): void {
    window.open(
      `https://www.themoviedb.org/movie/${event.id}`,
      '_blank'
    );
  }

}
