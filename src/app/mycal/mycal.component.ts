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
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
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

import {School} from '../school';
import {Teacher} from '../teacher';

interface Film {
  id: number;
  title: string;
  start: string;
  school_id: number;
  teacher_id: number;
  school: School;
  teacher: Teacher;
  createdOn: string;
}


@Component({
  selector: 'app-mycal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mycal.component.html',
  styleUrls: ['./mycal.component.css']
})
export class MycalComponent implements OnInit {
  API_URL = 'http://www.mephistosoftware.com/rester/schedules';
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  /*
  events$: ScheduleEvent[] = [{
    id: 1,
    title: ' a death is born',
    school_id: 1,
    teacher_id: 1,
    school: new School('Joe Teacher', '555-1212'),
    teacher: new Teacher(),
    createdOn: '2019-09-29',
    start: new Date(),
    end: new Date(),
    color: {primary: '#FFF000', secondary: '#FF0000'},
  }];
   */
  // events$: ScheduleEvent[];
  events$: Observable<Array<ScheduleEvent>>;
  // events$: Observable<Array<CalendarEvent<{ film: Film }>>>;
  // events$: Observable<Array<ScheduleEvent[]>>;

  activeDayIsOpen = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEvents();
    // console.log(this.events$);
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

    this.events$ = this.http
      .get(this.API_URL)
      .pipe(map((results: ScheduleEvent[]) => {

        return results.map((scheduleEvent: ScheduleEvent) => {
          return {
            id: scheduleEvent.id,
            title: scheduleEvent.teacher.name + ' at ' + scheduleEvent.school.name,
            school_id: scheduleEvent.school_id,
            teacher_id: scheduleEvent.teacher_id,
            school: scheduleEvent.school,
            teacher: scheduleEvent.teacher,
            createdOn: scheduleEvent.createdOn,
            start: new Date(scheduleEvent.start),
            end: new Date(scheduleEvent.end),
            // start: new Date(),
            // end: new Date(),
            color: colors.yellow,
            meta: {scheduleEvent}
          };
        });
      })
      );
  }


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
