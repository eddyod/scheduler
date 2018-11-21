import { UserSite } from './userSite';
export class User {

  public id: number;
  public username: string;
  public email: string;
  public is_superuser: boolean;
  public password: string;
  public site: UserSite;


  constructor() {}
}
