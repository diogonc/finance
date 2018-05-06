import { Repository } from './repository';
import { Account } from '../../models/account';
import { Injectable } from '@angular/core';
import { MyArray } from '../../util/my-array';

@Injectable()
export class AccountRepository extends Repository {

  constructor() { super('account'); }

  getAll(): Array<Account> {
    const list = this.getListOfObjects();

    const accounts = [];

    for (let i = 0; i < list.length; i++) {
      accounts.push(list[i] as Account);
    }

    return this.order(accounts, "");
  }

  getOrdered(userLogin: string): Array<Account> {
    const filtered = [];
    const accounts = this.getAllUnordered();
    const lenght = accounts.length;

    for (let i = 0; i < lenght; i++) {
      const a = accounts[i];
      const account = new Account(a.uuid, a.name, a.owner, a.priority);
      filtered.push(account);
    }

    return this.order(filtered, userLogin);
  }

  getFilteredByOwner(ownerUuids: Array<string>): Array<Account> {
    const filtered = [];
    const accounts = this.getAllUnordered();
    const lenght = accounts.length;

    // //TODO: em vez de usar for, fazer um map, e depois um filter
    for (let i = 0; i < lenght; i++) {
      const a = accounts[i];
      const account = new Account(a.uuid, a.name, a.owner, a.priority);

      if ((ownerUuids.length === 0 || account.owner === null || MyArray.any(account.owner.uuid, ownerUuids))) {
        filtered.push(account);
      }
    }

    return this.order(filtered, "");
  }

  private order(data: Array<Account>, userLogin: string): Array<Account> {
    return data.sort(function (item, anotherItem) {
      const itemLoginScore = userLogin !== "" && item.owner.userLogin === userLogin ? 1000 : 0
      const anotherItemLoginScore = userLogin !== "" && anotherItem.owner.userLogin === userLogin ? 1000 : 0
      const itemScore = itemLoginScore + item.owner.priority * 100 + item.priority;
      const anotherItemScore = anotherItemLoginScore + anotherItem.owner.priority * 100 + anotherItem.priority;

      if (anotherItemScore >= itemScore)
        return 1
      return -1;
    });
  }

  private getAllUnordered(): Array<Account> {
    const list = this.getListOfObjects();

    const accounts = [];

    for (let i = 0; i < list.length; i++) {
      accounts.push(list[i] as Account);
    }
    return accounts;
  }

}
