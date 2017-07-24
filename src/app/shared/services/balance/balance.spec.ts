/* tslint:disable:no-unused-variable */
import { Account } from '../../models/account';
import { Category } from '../../models/category';
import { Transaction } from '../../models/transaction';
import { Balance } from './balance';

describe('Balance', () => {
    let transactions;

    beforeEach(() => {
        transactions = [];
    });

    it('should sum two credits', () => {
        transactions.push(createTransaction(12, 'credit'));
        transactions.push(createTransaction(11, 'creditTransfer'));

        let result = Balance.get(transactions);

        expect(result).toEqual(23);
    });

    it('should subtract debit', () => {
        transactions.push(createTransaction(12, 'credit'));
        transactions.push(createTransaction(2, 'debit'));
        transactions.push(createTransaction(1, 'debitTransfer'));

        let result = Balance.get(transactions);

        expect(result).toEqual(9);
    });
});


function createTransaction(value: number, type: string): Object {
    return new Transaction('1', '1', value, 'test', '2010-01-01', new Account('2', 'account', 1), new Category('3', 'category', type, 1));
};
