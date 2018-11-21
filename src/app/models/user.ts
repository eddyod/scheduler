import { UserSite } from './userSite';
export class User {

  public id: number;
  public username: string;
  public email: string;
  public main_site: string;
  public is_superuser: boolean;
  public site: UserSite;

  constructor() { }
}
