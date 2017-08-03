/* tslint:disable:no-unused-variable */
import { Account } from '../../models/account';
import { Category } from '../../models/category';
import { Transaction } from '../../models/transaction';
import { CategoryType } from '../../models/categoryType';
import { Balance } from './balance';


describe('Balance', () => {
    let transactions;

    beforeEach(() => {
        transactions = [];
    });

    it('should sum two credits', () => {
        transactions.push(createTransaction(12, CategoryType.Credit));
        transactions.push(createTransaction(11, CategoryType.CreditTransfer));

        let result = Balance.get(transactions);

        expect(result).toEqual(23);
    });

    it('should subtract debit', () => {
        transactions.push(createTransaction(12, CategoryType.Credit));
        transactions.push(createTransaction(2, CategoryType.Debit));
        transactions.push(createTransaction(1, CategoryType.DebitTransfer));

        let result = Balance.get(transactions);

        expect(result).toEqual(9);
    });
});


function createTransaction(value: number, type: number): Object {
    return new Transaction('1', '1', value, 'test', '2010-01-01', new Account('2', 'account', 1), new Category('3', 'category', type, 1));
};
