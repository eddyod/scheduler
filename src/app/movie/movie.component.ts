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
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

import { ScheduleEvent } from '../scheduleEvent';
import { APIService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

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
  selector: 'app-movie',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent<{ film: Film }>>>;
  activeDayIsOpen = false;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;


  constructor(private http: HttpClient) { }

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
      .get('https://api.themoviedb.org/3/discover/movie', { params })
      .pipe(
        map(({ results }: { results: Film[] }) => {
          return results.map((film: Film) => {
            console.log(film);

            return {
              title: film.title,
              start: new Date(film.release_date + timezoneOffsetString),
              color: colors.yellow,
              meta: {
                film
              }
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
      events: Array<CalendarEvent<{ film: Film }>>;
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

  eventClicked(event: CalendarEvent<{ film: Film }>): void {
    window.open(
      `https://www.themoviedb.org/movie/${event.meta.film.id}`,
      '_blank'
    );
  }

}
