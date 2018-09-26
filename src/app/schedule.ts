import {School} from './school';
import {Teacher} from './teacher';

export class Schedule {

  public id: number;
  public name: string;
  public startTime: string;
  public endTime: string;
  public school_id: number;
  public teacher_id: number;
  public school: School;
  public teacher: Teacher;
  public createdOn: string;
  public isActive = true;
  public createdBy: 1;

  constructor(name, startTime, endTime, school_id, teacher_id, createdBy) {}

}
