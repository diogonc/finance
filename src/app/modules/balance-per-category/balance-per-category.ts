import { Injectable } from '@angular/core';
import { TransactionRepository } from '../../shared/services/repository/transaction-repository';
import { BalancePerCategoryReport } from './balance-per-category-report';

@Injectable()
export class BalancePerCategory {

    constructor(private transactionRepository: TransactionRepository) { }

    get(accounts: Array<string>, initialDate: Date, finalDate: Date): BalancePerCategoryReport {
        const transactions = this.transactionRepository.getFiltered([], accounts, initialDate, finalDate, '', 'date asc');
        const totalTransactions = transactions.length;
        const balancePerCategory = new BalancePerCategoryReport();

        for (let index = 0; index < totalTransactions; index++) {
            const transaction = transactions[index];
            balancePerCategory.addTransaction(transaction);
        }
        balancePerCategory.fillEmptyCells();
        balancePerCategory.sortCells();
        balancePerCategory.sortRows();
        return balancePerCategory;
    }
}


