import {beforeEach, describe, expect, it} from '@angular/core/testing';
import {Transaction} from '../models/transaction.model';
import {Balance} from './balance.service';

describe('FinanceApi', () => {
    let transactions;

    beforeEach(() => {
        transactions = [];
    });

    it('should sum two credits', () => {
        transactions.push(createTransaction(12, 'credit'));
        transactions.push(createTransaction(11, 'creditTransfer'));

        var result = Balance.get(transactions);

        expect(result).toEqual(23);
    });

    it('should subtract debit', () => {
        transactions.push(createTransaction(12, 'credit'));
        transactions.push(createTransaction(2, 'debit'));
        transactions.push(createTransaction(1, 'debitTransfer'));

        var result = Balance.get(transactions);

        expect(result).toEqual(9);
    });
});


function createTransaction(value: number, type: string): Object {
    return new Transaction('1', '1', value, 'test', '2010-01-01', '2', 'account', '3', 'category', type);
}
