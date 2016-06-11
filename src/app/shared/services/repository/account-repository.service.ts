import {Repository} from './repository.service';
import {Account} from '../../models/account.model';

export class AccountRepository extends Repository {

  constructor() { super('account'); }

  getAll(): Array<Account> {
    var data = this.makeACopy(this.getData());
    var accounts = [];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
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
