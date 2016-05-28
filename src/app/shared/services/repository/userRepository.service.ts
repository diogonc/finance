import {User} from '../../models/user.model';

export class UserRepository {
  private _key: string;

  constructor() { this._key = 'user'; }

  saveUser(user: User) { localStorage.setItem(this._key, JSON.stringify(user)); }

  deleteUser() { localStorage.removeItem(this._key); }

  getUser(): User { return JSON.parse(localStorage.getItem(this._key)); }
}
