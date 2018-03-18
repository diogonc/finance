import { Repository } from './repository';
import { Account } from '../../models/account';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountRepository extends Repository {

  constructor() { super('account'); }

  getAll(): Array<Account> {
    const list = this.getListOfObjects();

    const accounts = [];

    for (let i = 0; i < list.length; i++) {
      accounts.push(list[i] as Account);
    }

    return this.order(accounts);
  }

  getFiltered(userLogin: string):
    Array<Account> {
    const filtered = [];
    const accounts = this.getAll();
    const lenght = accounts.length;

    for (let i = 0; i < lenght; i++) {
      const a = accounts[i];
      const account = new Account(a.uuid, a.name, a.owner, a.priority);

      if ((userLogin === null || account.owner === null || account.owner.userLogin === userLogin)) {
        filtered.push(account);
      }
    }

    return this.order(filtered);
  }

  private order(data: Array<Account>): Array<Account> {
    return data.sort(function (item, anotherItem) {
      return anotherItem.priority - item.priority;
    });
  }
}
