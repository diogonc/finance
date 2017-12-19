import { Repository } from './repository';
import { Injectable } from '@angular/core';
import { Account } from '../../models/account';
import { Category } from '../../models/category';
import { Transaction } from '../../models/transaction';
import { MyArray } from '../../util/my-array';

@Injectable()
export class TransactionRepository extends Repository {

  constructor() {
    super('transaction');
  }

  get(key: string): Transaction {
    const t = super.get(key);

    if (t !== null) {
      return new Transaction(t.uuid, t.propertyUuid, t.value, t.description, t.date, t.account, t.category);
    }
    return null;
  }

  getFiltered(categoryUuids: Array<string>, accountUuids: Array<string>, initialDate: Date, finalDate: Date, description: string,  order):
    Array<Transaction> {
    const filtered = [];
    const transactions = this.getAll();
    const lenght = transactions.length;

    for (let i = 0; i < lenght; i++) {
      const t = transactions[i];
      const transaction = new Transaction(t.uuid, t.propertyUuid, t.value, t.description, t.date,
        t.account, t.category);

      if ((categoryUuids.length === 0 || MyArray.any(transaction.category.uuid, categoryUuids)) &&
        (accountUuids.length === 0 || MyArray.any(transaction.account.uuid, accountUuids)) &&
        (initialDate === null || initialDate <= transaction.date) &&
        (finalDate === null || transaction.date <= finalDate) &&
        (description === '' || transaction.description.indexOf(description) !== -1)) {
        filtered.push(transaction);
      }
    }

    return this.order(filtered, order);
  }

  private order(data: Array<Transaction>, order: string): Array<Transaction> {
    if (order === 'value') {
      return data.sort(function (transaction, anotherTransaction) {
        return anotherTransaction.value - transaction.value;
      });
    } else if (order === 'date asc') {
      return data.sort(function (transaction, anotherTransaction) {
        return transaction.date.valueOf() - anotherTransaction.date.valueOf();
      });
    } else { // date desc
      return data.sort(function (transaction, anotherTransaction) {
        return anotherTransaction.date.valueOf() - transaction.date.valueOf();
      });
    }
  }
}
