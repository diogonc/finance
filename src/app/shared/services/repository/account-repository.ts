import { Repository } from './repository';
import { Account } from '../../models/account';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountRepository extends Repository {

  constructor() { super('account'); }

  getAll(): Array<Account> {
    let list = this.getListOfObjects();

    let accounts = [];

    for (let i = 0; i < list.length; i++) {
      accounts.push(list[i] as Account);
    }

    return this.order(accounts);
  }

  private order(data: Array<Account>): Array<Account> {
    return data.sort(function (item, anotherItem) {
      return anotherItem.priority - item.priority;
    });
  }
}
