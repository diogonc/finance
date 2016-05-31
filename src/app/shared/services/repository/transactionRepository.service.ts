import {Repository} from './repository.service';
import {Injectable} from '@angular/core';
import {Transaction} from '../../models/transaction.model';

@Injectable()
export class TransactionRepository extends Repository {

  constructor() {
    super('transaction');
  }

  get(key: string): Transaction {
    var t = super.get(key);

    if (t !== null) {
      return new Transaction(t.uuid, t.propertyUuid, t.value, t.description, t.date,
        t.accountUuid, t.accountName, t.categoryUuid, t.categoryName, t.categoryType);
    }
    return null;
  }

  getFiltered(categoryUuid: string, accountUuid: string, initialDate: Date, finalDate: Date):
    Array<Transaction> {
    var filtered = [];
    var transactions = this.getAll();
    var lenght = transactions.length;

    for (var i = 0; i < lenght; i++) {
      var t = transactions[i];
      var transaction = new Transaction(t.uuid, t.propertyUuid, t.value, t.description, t.date,
        t.accountUuid, t.accountName, t.categoryUuid, t.categoryName, t.categoryType);

      if ((transaction.categoryUuid === categoryUuid || categoryUuid === '') &&
        (transaction.accountUuid === accountUuid || accountUuid === '') &&
        (initialDate <= transaction.date || initialDate === null) &&
        (transaction.date <= finalDate || finalDate === null)) {
        filtered.push(transaction);
      }
    }

    return filtered;
  }
}
