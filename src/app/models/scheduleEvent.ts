import { CalendarEvent } from 'angular-calendar';
import { Location } from './location';
import { Employee } from './employee';

export interface ScheduleEvent extends CalendarEvent {
  id: number;
  title: string;
  location_id: number;
  employee_id: number;
  location: Location;
  employee: Employee;
  pay_rate: number;
  created: string;
  completed: boolean;

}
