import {Repository} from './repository';
import {Account} from '../../models/account';

export class AccountRepository extends Repository {

  constructor() { super('account'); }

  getAll(): Array<Account> {
    let data = this.makeACopy(this.getData());
    let accounts = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      accounts.push(new Account(item.uuid, item.name, item.priority));
    }

    return this.order(accounts);
  }

  private order(data: Array<Account>): Array<Account> {
    return data.sort(function (item, anotherItem) {
      return anotherItem.priority - item.priority;
    });
  }
}
