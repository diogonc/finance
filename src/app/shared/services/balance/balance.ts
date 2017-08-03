import { Transaction } from '../../models/transaction';
import { Injectable } from '@angular/core';
import { CategoryType } from '../../models/categoryType'

@Injectable()
export class Balance {

    static get(transactions: Array<Transaction>): number {
        let numberOfItens = transactions.length;
        let balance = 0;
        for (let i = 0; i < numberOfItens; i++) {
            let transaction = transactions[i];
            let type = transaction.category.categoryType;
            if (type === CategoryType.Credit || type === CategoryType.CreditTransfer) {
                balance += transaction.value;
            }
            if (type === CategoryType.Debit || type === CategoryType.DebitTransfer) {
                balance -= transaction.value;
            }
        }
        return balance;
    }
}
