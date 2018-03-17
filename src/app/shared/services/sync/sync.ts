import { AccountRepository } from '../repository/account-repository';
import { OwnerRepository } from '../repository/owner-repository';
import { CategoryRepository } from '../repository/category-repository';
import { GroupRepository } from '../repository/group-repository';
import { TransactionRepository } from '../repository/transaction-repository';
import { User } from '../../models/user';
import { FinanceApi } from '../api/finance-api';
import { MyDate } from '../../util/my-date';
import { Injectable } from '@angular/core';

@Injectable()
export class Sync {

  constructor(
    private api: FinanceApi,
    private accountRepository: AccountRepository,
    private ownerRepository: OwnerRepository,
    private categoryRepository: CategoryRepository,
    private groupRepository: GroupRepository,
    private transactionRepository: TransactionRepository) { }

  getAllDataFromServer(callback: () => any, error: () => any): void {
    this.api.getTransactions(
        (transactions) =>
        this.convertTransactionFromServer(transactions, (transactionsConverted) => {
          this.transactionRepository.saveAll(transactionsConverted);
          callback();
        }), error);
    this.api.getOwners((owners) => this.ownerRepository.saveAll(owners));
    this.api.getAccounts((accounts) => this.accountRepository.saveAll(accounts));
    this.api.getCategories((categories) => this.categoryRepository.saveAll(categories));
    this.api.getGroups((groups) => this.groupRepository.saveAll(groups));
  }

  deleteAllLocalData(): void {
    localStorage.clear();
  }

  private convertTransactionFromServer(
    transactionsFromServer: [any], callback: (transactionsConverted: any) => any): void {
    const lenght = transactionsFromServer.length;
    const transactions = [];

    for (let i = 0; i < lenght; i++) {
      const transaction = transactionsFromServer[i];
      transaction.date = MyDate.convertToDateFromString(transaction.date);

      transactions.push(transaction);
    }
    callback(transactions);
  }
}
