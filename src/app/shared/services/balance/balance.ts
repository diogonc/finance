import { Transaction } from '../../models/transaction';
import { Injectable } from '@angular/core';
import { Type } from '../../models/type'

@Injectable()
export class Balance {

    static get(transactions: Array<Transaction>): number {
        let numberOfItens = transactions.length;
        let balance = 0;
        for (let i = 0; i < numberOfItens; i++) {
            let transaction = transactions[i];
            let type = transaction.category.categoryType;
            if (type === Type.Credit || type === Type.CreditTransfer) {
                balance += transaction.value;
            }
            if (type === Type.Debit || type === Type.DebitTransfer) {
                balance -= transaction.value;
            }
        }
        return balance;
    }
}
