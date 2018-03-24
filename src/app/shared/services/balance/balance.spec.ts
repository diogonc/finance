/* tslint:disable:no-unused-variable */
import { Account } from '../../models/account';
import { Category } from '../../models/category';
import { Transaction } from '../../models/transaction';
import { CategoryType } from '../../models/categoryType';
import { Balance } from './balance';
import { Group } from '../../models/group';
import { Owner } from '../../models/owner';


describe('Balance', () => {
    let transactions;

    beforeEach(() => {
        transactions = [];
    });

    it('should sum two credits', () => {
        transactions.push(createTransaction(12, CategoryType.Credit));
        transactions.push(createTransaction(11, CategoryType.CreditTransfer));

        const result = Balance.get(transactions);

        expect(result).toEqual(23);
    });

    it('should subtract debit', () => {
        transactions.push(createTransaction(12, CategoryType.Credit));
        transactions.push(createTransaction(2, CategoryType.Debit));
        transactions.push(createTransaction(1, CategoryType.DebitTransfer));

        const result = Balance.get(transactions);

        expect(result).toEqual(9);
    });
});


function createTransaction(value: number, type: number): Object {
    const group = new Group('33', 'name', type, 1);
    const owner = new Owner('34', 'name', 1, 'login');
    return new Transaction('1', '1', value, 'test', '2010-01-01',
        new Account('2', 'account', owner, 1),
        new Category('3', 'category', type, group, 1));
}
