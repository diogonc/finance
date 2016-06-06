import {beforeEach, describe, expect, it} from '@angular/core/testing';
import {Account} from '../models/account.model';
import {Transaction} from '../models/transaction.model';
import {BalancePerAccount} from './balance-per-account.service';
import {TransactionRepository} from '../services/repository/transactionRepository.service';
import {AccountRepository} from '../services/repository/accountRepository.service';

describe('BalancePerAccount', () => {
    let balancePerAccount;
    let transactionRepository;
    let accountRepository;
    var transactions;

    beforeEach(() => {
        transactions = [];
        transactionRepository = new TransactionRepository();
        accountRepository = new AccountRepository();
        balancePerAccount = new BalancePerAccount(transactionRepository, accountRepository);

        accountRepository.saveAll([new Account('1', 'account 1', 2), new Account('2', 'account 2', 1)]);
    });

    it('should sum two credits', () => {

        transactions.push(createTransaction(12, 'credit', '1'));
        transactions.push(createTransaction(11, 'creditTransfer', '1'));
        transactionRepository.saveAll(transactions);

        var result = balancePerAccount.get(new Date());

        expect(result.balances.length).toEqual(1);
        expect(result.balances[0].account).toEqual('account 1');
        expect(result.balances[0].balance).toEqual(23);
    });

    it('should subtract debit', () => {
        transactions.push(createTransaction(12, 'credit', '1'));
        transactions.push(createTransaction(2, 'debit', '1'));
        transactions.push(createTransaction(1, 'debitTransfer', '1'));
        transactionRepository.saveAll(transactions);

        var result = balancePerAccount.get(new Date());

        expect(result.balances.length).toEqual(1);
        expect(result.balances[0].account).toEqual('account 1');
        expect(result.balances[0].balance).toEqual(9);
    });

    it('should consider two accounts', () => {
        transactions.push(createTransaction(12, 'credit', '1'));
        transactions.push(createTransaction(1, 'debitTransfer', '1'));
        transactions.push(createTransaction(2, 'credit', '2'));
        transactionRepository.saveAll(transactions);

        var result = balancePerAccount.get(new Date());

        expect(result.balances.length).toEqual(2);
        expect(result.balances[0].account).toEqual('account 1');
        expect(result.balances[0].balance).toEqual(11);
        expect(result.balances[1].account).toEqual('account 2');
        expect(result.balances[1].balance).toEqual(2);
    });

});

function createTransaction(value: number, type: string, accountUUid: string): Object {
    return new Transaction('1', '1', value, 'test', '2010-01-01', accountUUid, accountUUid, '3', 'category', type);
}
