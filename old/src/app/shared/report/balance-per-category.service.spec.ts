import {beforeEach, describe, expect, it} from '@angular/core/testing';
import {Transaction} from '../models/transaction.model';
import {BalancePerCategory} from './balance-per-category.service';
import {TransactionRepository} from '../services/repository/transaction-repository.service';


describe('BalancePerCategory', () => {
    let balancePerCategory;
    let transactionRepository;
    var transactions;

    beforeEach(() => {
        transactions = [];
        transactionRepository = new TransactionRepository();
        balancePerCategory = new BalancePerCategory(transactionRepository);
    });

    it('should work', () => {
        expect(true).toEqual(true);
    });

});

function createTransaction(value: number, type: string, accountUUid: string): Object {
    return new Transaction('1', '1', value, 'test', '2010-01-01', accountUUid, accountUUid, '3', 'category', type);
}
