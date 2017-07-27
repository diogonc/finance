import { Account } from '../shared/models/account';
import { Category } from '../shared/models/category';
import { Transaction } from '../shared/models/transaction';
import { Type } from '../shared/models/type';
import { BalancePerAccount } from './balance-per-account';
import { TransactionRepository } from '../shared/services/repository/transaction-repository';
import { AccountRepository } from '../shared/services/repository/account-repository';

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

        accountRepository.saveAll([new Account('1', 'account 1', 2), new Account('2', 'account 2', 1)]);
    });

    it('should sum two credits', () => {

        transactions.push(createTransaction(12, Type.Credit, '1'));
        transactions.push(createTransaction(11, Type.CreditTransfer, '1'));
        transactionRepository.saveAll(transactions);

        let result = balancePerAccount.get(new Date());

        expect(result.balances.length).toEqual(1);
        expect(result.balances[0].account).toEqual('account 1');
        expect(result.balances[0].balance).toEqual(23);
    });

    it('should subtract debit', () => {
        transactions.push(createTransaction(12, Type.Credit, '1'));
        transactions.push(createTransaction(2, Type.Debit, '1'));
        transactions.push(createTransaction(1, Type.DebitTransfer, '1'));
        transactionRepository.saveAll(transactions);

        let result = balancePerAccount.get(new Date());

        expect(result.balances.length).toEqual(1);
        expect(result.balances[0].account).toEqual('account 1');
        expect(result.balances[0].balance).toEqual(9);
    });

    it('should consider two accounts', () => {
        transactions.push(createTransaction(12, Type.Credit, '1'));
        transactions.push(createTransaction(1, Type.DebitTransfer, '1'));
        transactions.push(createTransaction(2, Type.Credit, '2'));
        transactionRepository.saveAll(transactions);

        let result = balancePerAccount.get(new Date());

        expect(result.balances.length).toEqual(2);
        expect(result.balances[0].account).toEqual('account 1');
        expect(result.balances[0].balance).toEqual(11);
        expect(result.balances[1].account).toEqual('account 2');
        expect(result.balances[1].balance).toEqual(2);
    });

});

function createTransaction(value: number, type: number, accountUUid: string): Object {
    return new Transaction('1', '1', value, 'test', '2010-01-01', new Account(accountUUid, 'account', 1),
        new Category(accountUUid, 'category', type, 3));
}
