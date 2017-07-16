import { Injectable } from '@angular/core';
import { TransactionRepository } from '../shared/services/repository/transaction-repository';
import { BalancePerCategoryReport } from './balance-per-category-report';

@Injectable()
export class BalancePerCategory {
    private transactionRepository;

    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    get(accounts: Array<string>, initialDate: Date, finalDate: Date): BalancePerCategoryReport {
        let transactions = this.transactionRepository.getFiltered([], accounts, initialDate, finalDate, 'date asc');
        let totalTransactions = transactions.length;
        let balancePerCategory = new BalancePerCategoryReport();

        for (let index = 0; index < totalTransactions; index++) {
            let transaction = transactions[index];
            balancePerCategory.addTransaction(transaction);
        }
        balancePerCategory.fillEmptyCells();
        balancePerCategory.sortCells();
        return balancePerCategory;
    }
}


