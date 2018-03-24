import { Account } from '../../shared/models/account';
import { Category } from '../../shared/models/category';
import { Transaction } from '../../shared/models/transaction';
import { CategoryType } from '../../shared/models/categoryType';
import { BalancePerAccount } from './balance-per-account';
import { TransactionRepository } from '../../shared/services/repository/transaction-repository';
import { AccountRepository } from '../../shared/services/repository/account-repository';
import { Group } from '../../shared/models/group';
import { Owner } from '../../shared/models/owner';

describe('BalancePerAccount', () => {
    let balancePerAccount;
    let transactionRepository;
    let accountRepository;
    let transactions;

    beforeEach(() => {
        transactions = [];
        transactionRepository = new TransactionRepository();
        accountRepository = new AccountRepository();
        balancePerAccount = new BalancePerAccount(transactionRepository, accountRepository);
        const owner = new Owner('34', 'name', 1, 'login');
        accountRepository.saveAll([new Account('1', 'account 1', owner, 2), new Account('2', 'account 2', owner, 1)]);
    });

    it('should sum two credits', () => {

        transactions.push(createTransaction(12, CategoryType.Credit, '1'));
        transactions.push(createTransaction(11, CategoryType.CreditTransfer, '1'));
        transactionRepository.saveAll(transactions);

        const result = balancePerAccount.get(new Date());

        expect(result.balances[0].balancesPerAccount.length).toEqual(1);
        expect(result.balances[0].balancesPerAccount[0].account).toEqual('account 1');
        expect(result.balances[0].balancesPerAccount[0].balance).toEqual(23);
        expect(result.balances[0].total).toEqual(23);
    });

    it('should subtract debit', () => {
        transactions.push(createTransaction(12, CategoryType.Credit, '1'));
        transactions.push(createTransaction(2, CategoryType.Debit, '1'));
        transactions.push(createTransaction(1, CategoryType.DebitTransfer, '1'));
        transactionRepository.saveAll(transactions);

        const result = balancePerAccount.get(new Date());

        expect(result.balances[0].balancesPerAccount.length).toEqual(1);
        expect(result.balances[0].balancesPerAccount[0].account).toEqual('account 1');
        expect(result.balances[0].balancesPerAccount[0].balance).toEqual(9);
    });

    it('should consider two accounts', () => {
        transactions.push(createTransaction(12, CategoryType.Credit, '1'));
        transactions.push(createTransaction(1, CategoryType.DebitTransfer, '1'));
        transactions.push(createTransaction(2, CategoryType.Credit, '2'));
        transactionRepository.saveAll(transactions);

        const result = balancePerAccount.get(new Date());

        expect(result.balances[0].balancesPerAccount.length).toEqual(2);
        expect(result.balances[0].balancesPerAccount[0].account).toEqual('account 1');
        expect(result.balances[0].balancesPerAccount[0].balance).toEqual(11);
        expect(result.balances[0].balancesPerAccount[1].account).toEqual('account 2');
        expect(result.balances[0].balancesPerAccount[1].balance).toEqual(2);
    });

});

function createTransaction(value: number, type: number, accountUUid: string): Object {
    const group = new Group('33', 'name', type, 1);
    const owner = new Owner('34', 'name', 1, 'login');
    return new Transaction('1', '1', value, 'test', '2010-01-01', new Account(accountUUid, 'account', owner, 1),
        new Category(accountUUid, 'category', type, group, 3));
}
