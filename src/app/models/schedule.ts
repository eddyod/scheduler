export class Schedule  {
  start: string;
  end: string;
  pay_rate: number;
  created: Date;
  completed: string;
  location_id: number;
  employee_id: number;
  site: string;

  constructor(start, end, location_id, employee_id, created_id, pay_rate) {}

}
