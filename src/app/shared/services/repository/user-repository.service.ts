import {User} from '../../models/user.model';
import {Injectable} from '@angular/core';

@Injectable()
export class UserRepository {
  private _key: string;

  constructor() { this._key = 'user'; }

  saveUser(user: User) { localStorage.setItem(this._key, JSON.stringify(user)); }

  deleteUser() { localStorage.removeItem(this._key); }

  getUser(): User { return JSON.parse(localStorage.getItem(this._key)); }

  isLogged(): boolean {
    var user = this.getUser();
    return (user !== undefined && user !== null);
  }
}
