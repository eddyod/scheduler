import { Site } from './site';
import { User } from './user';

export class UserSite {

  public id: number;
  public auth_id: string;
  public site_id: string;
  public site: Site;
  public user: User;


  constructor() { }
}
