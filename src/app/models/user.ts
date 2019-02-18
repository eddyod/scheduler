import { Site } from './site';

export class User {

  public id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public is_staff: boolean;
  public is_superuser: boolean;
  public password: string;
  public site: Site


  constructor() {}
}
