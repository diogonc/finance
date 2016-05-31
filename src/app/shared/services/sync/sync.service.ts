import {AccountRepository} from '../repository/accountRepository.service';
import {CategoryRepository} from '../repository/categoryRepository.service';
import {TransactionRepository} from '../repository/transactionRepository.service';
import {User} from '../../models/user.model';
import {FinanceApi} from '../api/finance-api.service';
import {DateService} from '../date/date.service';
import {Injectable} from '@angular/core';

@Injectable()
export class Sync {
  private _accountRepository: AccountRepository;
  private _categoryRepository: CategoryRepository;
  private _transactionRepository: TransactionRepository;
  private _api: FinanceApi;

  constructor(
      financeApi: FinanceApi, accountRepository: AccountRepository,
      categoryRepository: CategoryRepository, transactionRepository: TransactionRepository) {
    this._api = financeApi;
    this._accountRepository = accountRepository;
    this._categoryRepository = categoryRepository;
    this._transactionRepository = transactionRepository;
  }

  getAllDataFromServer(user: User, callback: () => any): void {
    this._api.getAccounts(user, (accounts) => this._accountRepository.saveAll(accounts._body));
    this._api.getCategories(
        user, (categories) => this._categoryRepository.saveAll(categories._body));
    this._api.getTransactions(
        user, (transactions) =>
                  this.convertTransactionFromServer(transactions._body, (transactionsConverted) => {
                    this._transactionRepository.saveAll(transactionsConverted);
                    callback();
                  }));
  }

  deleteAllLocalData(): void {
    this._accountRepository.deleteAll();
    this._categoryRepository.deleteAll();
    this._transactionRepository.deleteAll();
  }

  private convertTransactionFromServer(
      transactionsFromServer: string, callback: (transactionsConverted: any) => any): void {
    var transactionsFromServerAsObject = JSON.parse(transactionsFromServer);
    var lenght = transactionsFromServerAsObject.length;
    var transactions = [];

    for (var i = 0; i < lenght; i++) {
      var transaction = transactionsFromServerAsObject[i];
      transaction.date = DateService.convertToDateFromString(transaction.date);

      transactions.push(transaction);
    }
    callback(transactions);
  }
}
