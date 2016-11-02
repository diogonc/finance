import {Transaction} from '../../models/transaction';
import {Injectable} from '@angular/core';

@Injectable()
export class Balance {

    static get(transactions: Array<Transaction>): number {
        let numberOfItens = transactions.length;
        let balance = 0;
        for (let i = 0; i < numberOfItens; i++) {
            let transaction = transactions[i];
            let type = transaction.categoryType;
            if (type === 'credit' || type === 'creditTransfer') {
                balance += transaction.value;
            }
            if (type === 'debit' || type === 'debitTransfer') {
                balance -= transaction.value;
            }
        }
        return balance;
    }
}
