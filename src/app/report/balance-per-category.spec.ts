import {BalancePerCategory} from './balance-per-category';
import {TransactionRepository} from '../services/repository/transaction-repository';

describe('BalancePerCategory', () => {
    let balancePerCategory;
    let transactionRepository;
    let transactions;

    beforeEach(() => {
        transactions = [];
        transactionRepository = new TransactionRepository();
        balancePerCategory = new BalancePerCategory(transactionRepository);
    });

    it('should work', () => {
        expect(true).toEqual(true);
    });

});
