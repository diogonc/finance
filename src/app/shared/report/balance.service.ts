import {Transaction} from '../models/transaction.model';
import {Injectable} from '@angular/core';

@Injectable()
export class Balance {

    static get(transactions: Array<Transaction>): number {
        var numberOfItens = transactions.length;

        var balance = 0;
        for (var i = 0; i < numberOfItens; i++) {
            var transaction = transactions[i];
            var type = transaction.categoryType;
            if (type === 'credit') {
                balance += transaction.value;
            }
            if (type === 'debit') {
                balance -= transaction.value;
            }
        }
        return balance;
    }
}