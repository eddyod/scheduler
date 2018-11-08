import { User } from './user';

export class Employee {

  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public address1: string;
  public address2: string;
  public city: string;
  public postal_code: string;
  public province: string;
  public country: string;
  public created: string;
  public created_id: number;
  public active: boolean;

  public user: User;

  constructor() {}
}
