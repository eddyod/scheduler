import 'angular-calendar/css/angular-calendar.css';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

import {ScheduleEvent} from '../scheduleEvent';
import {APIService} from '../api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

const timezoneOffset = new Date().getTimezoneOffset();
const hoursOffset = String(Math.floor(Math.abs(timezoneOffset / 60))).padStart(
  2,
  '0'
);
const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
const direction = timezoneOffset > 0 ? '-' : '+';
const timezoneOffsetString = `T00:00:00${direction}${hoursOffset}${minutesOffset}`;

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
  API_URL = 'http://www.mephistosoftware.com/rester/schedules';
  view = 'month';
  viewDate = new Date();
  // events$: Observable<Array<CalendarEvent<{ scheduleEvent: ScheduleEvent }>>>;
  events$: Observable<Array<ScheduleEvent>>;
  // events$: Observable<ScheduleEvent[]>;
  // events$: Array<object> = [];
  activeDayIsOpen = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEvents();
    console.log(this.events$);
  }


  /*
  loadEvents() {
    this.http.get<ScheduleEvent[]>(this.API_URL)
      .subscribe((news: ScheduleEvent[]) => {
        this.events$ = news;
      }, (err) => {
        console.log(err);
      });
  }
   */



  loadEvents() {
    this.events$ = this.http.get<ScheduleEvent[]>(this.API_URL)
      .pipe(
      map(res => {
        console.log(res);
        return res.map(scheduleEvent => {
          return {
            id: scheduleEvent.id,
            title: 'junk',
            school_id: scheduleEvent.school_id,
            teacher_id: scheduleEvent.teacher_id,
            school: scheduleEvent.school,
            teacher: scheduleEvent.teacher,
            createdOn: scheduleEvent.createdOn,
            start: new Date(scheduleEvent.start + timezoneOffsetString),
            color: colors.yellow,
            meta: {
              scheduleEvent
            }
          };
        });
      })
      );
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

    const paramsfull = new HttpParams()
      .set(
      'primary_release_date.gte',
      format(getStart(this.viewDate), 'YYYY-MM-DD')
      )
      .set(
      'primary_release_date.lte',
      format(getEnd(this.viewDate), 'YYYY-MM-DD')
      )
      .set('api_key', '0ec33936a68018857d727958dca1424f');

    const params = new HttpParams();

    /*
    this.events$ = this.http
      .get('http://www.mephistosoftware.com/rester/schedules')
      .pipe(
      map(({results}: {results: ScheduleEvent[]}) => {
        return results.map((scheduleEvent: ScheduleEvent) => {
          return {
            id: scheduleEvent.id,
            title: 'junk',
            school_id: scheduleEvent.school_id,
            teacher_id: scheduleEvent.teacher_id,
            school: scheduleEvent.school,
            teacher: scheduleEvent.teacher,
            createdOn: scheduleEvent.createdOn,
            start: new Date(scheduleEvent.start + timezoneOffsetString),
            color: colors.yellow,
            meta: {
              scheduleEvent
            }
          };
        });
      })
      );
     */
  }

  dayClicked({
    date,
    events
  }: {
      date: Date;
      events: Array<CalendarEvent<{scheduleEvent: ScheduleEvent}>>;
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

  eventClicked(event: CalendarEvent<{scheduleEvent: ScheduleEvent}>): void {
    window.open(
      `http://www.mephistosoftware.com/rester/schedules/${event.meta.scheduleEvent.id}`,
      '_blank'
    );
  }

}
