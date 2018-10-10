import {CalendarEvent} from 'angular-calendar';
import {School} from './school';
import {Teacher} from './teacher';

export interface ScheduleEvent extends CalendarEvent {
  id: number;
  title: string;
  school_id: number;
  teacher_id: number;
  school: School;
  teacher: Teacher;
  createdOn: string;

}
