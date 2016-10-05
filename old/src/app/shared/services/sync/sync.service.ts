import {AccountRepository} from '../repository/account-repository.service';
import {CategoryRepository} from '../repository/category-repository.service';
import {TransactionRepository} from '../repository/transaction-repository.service';
import {User} from '../../models/user.model';
import {FinanceApi} from '../api/finance-api.service';
import {MyDate} from '../../util/my-date';
import {Injectable} from '@angular/core';

@Injectable()
export class Sync {
  private accountRepository: AccountRepository;
  private categoryRepository: CategoryRepository;
  private transactionRepository: TransactionRepository;
  private api: FinanceApi;

  constructor(
      financeApi: FinanceApi, accountRepository: AccountRepository,
      categoryRepository: CategoryRepository, transactionRepository: TransactionRepository) {
    this.api = financeApi;
    this.accountRepository = accountRepository;
    this.categoryRepository = categoryRepository;
    this.transactionRepository = transactionRepository;
  }

  getAllDataFromServer(user: User, callback: () => any, error: () => any): void {
    this.api.getAccounts(user, (accounts) => this.accountRepository.saveAll(accounts._body));
    this.api.getCategories(
        user, (categories) => this.categoryRepository.saveAll(categories._body));
    this.api.getTransactions(
        user, (transactions) =>
                  this.convertTransactionFromServer(transactions._body, (transactionsConverted) => {
                    this.transactionRepository.saveAll(transactionsConverted);
                    callback();
                  }), error);
  }

  deleteAllLocalData(): void {
    this.accountRepository.deleteAll();
    this.categoryRepository.deleteAll();
    this.transactionRepository.deleteAll();
  }

  private convertTransactionFromServer(
      transactionsFromServer: string, callback: (transactionsConverted: any) => any): void {
    var transactionsFromServerAsObject = JSON.parse(transactionsFromServer);
    var lenght = transactionsFromServerAsObject.length;
    var transactions = [];

    for (var i = 0; i < lenght; i++) {
      var transaction = transactionsFromServerAsObject[i];
      transaction.date = MyDate.convertToDateFromString(transaction.date);

      transactions.push(transaction);
    }
    callback(transactions);
  }
}
