import {Injectable} from '@angular/core';
import {TransactionRepository} from '../services/repository/transaction-repository.service';
import {BalancePerCategoryReport} from './balance-per-category-report';

@Injectable()
export class BalancePerCategory {
    private transactionRepository;

    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    get(initialDate: Date, finalDate: Date): BalancePerCategoryReport {
        var transactions = this.transactionRepository.getFiltered('', '', initialDate, finalDate, 'date asc');
        var totalTransactions = transactions.length;
        var balancePerCategory = new BalancePerCategoryReport();

        for (var index = 0; index < totalTransactions; index++) {
            var transaction = transactions[index];
            balancePerCategory.addTransaction(transaction);
        }
        balancePerCategory.fillEmptyCells();
        return balancePerCategory;
    }
}


