import { Site } from './site';
import { User } from './user';

export class UserSite {

  public id: number;
  public user_id: string;
  public site_id: string;
  public site: Site;
  public user: User;


  constructor(user_id, site_id) {
    this.user_id = user_id;
    this.site_id = site_id;
  }
}
