import {User} from '../../models/user';
import {Injectable} from '@angular/core';

@Injectable()
export class UserRepository {
  private key: string;

  constructor() { this.key = 'user'; }

  saveUser(user: User) { localStorage.setItem(this.key, JSON.stringify(user)); }

  deleteUser() { localStorage.removeItem(this.key); }

  getUser(): User { return JSON.parse(localStorage.getItem(this.key)); }

  isLogged(): boolean {
    const user = this.getUser();
    return (user !== undefined && user !== null);
  }
}
