import {Repository} from './repository.service';
import {DateService} from '../date/date.service';
import {Injectable} from '@angular/core';

@Injectable()
export class TransactionRepository extends Repository {
  private _dateService: DateService;

  constructor(dateService: DateService) {
    super('transaction');
    this._dateService = dateService;
  }

  // TODO: retornar transaction
  get(key: string): any {
    var transaction = super.get(key);

    if (transaction !== null) {
      transaction.date = this._dateService.convertToDateFromString(transaction.date);
      transaction.account = {uuid: transaction.accountUuid};
      transaction.category = {uuid: transaction.categoryUuid};
    }

    return transaction;
  }

  getFiltered(categoryUuid: string, accountUuid: string, initialDate: Date, finalDate: Date):
    Array<any> {
    var filtered = [];
    var transactions = this.getAll();
    var lenght = transactions.length;

    for (var i = 0; i < lenght; i++) {
      var transaction = transactions[i];
      transaction.date = this._dateService.convertToDateFromString(transaction.date);

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
