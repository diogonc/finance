import { AccountRepository } from '../repository/account-repository';
import { CategoryRepository } from '../repository/category-repository';
import { TransactionRepository } from '../repository/transaction-repository';
import { User } from '../../models/user';
import { FinanceApi } from '../api/finance-api';
import { MyDate } from '../../util/my-date';
import { Injectable } from '@angular/core';

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

  getAllDataFromServer(callback: () => any, error: () => any): void {
    this.api.getTransactions(
        (transactions) =>
        this.convertTransactionFromServer(transactions._body, (transactionsConverted) => {
          this.transactionRepository.saveAll(transactionsConverted);
          callback();
        }), error);
    this.api.getAccounts((accounts) => this.accountRepository.saveAll(accounts._body));
    this.api.getCategories((categories) => this.categoryRepository.saveAll(categories._body));
  }

  deleteAllLocalData(): void {
    localStorage.clear();
  }

  private convertTransactionFromServer(
    transactionsFromServer: string, callback: (transactionsConverted: any) => any): void {
    let transactionsFromServerAsObject = JSON.parse(transactionsFromServer);
    let lenght = transactionsFromServerAsObject.length;
    let transactions = [];

    for (let i = 0; i < lenght; i++) {
      let transaction = transactionsFromServerAsObject[i];
      transaction.date = MyDate.convertToDateFromString(transaction.date);

      transactions.push(transaction);
    }
    callback(transactions);
  }
}
