import {Injectable} from '@angular/core';
import {TransactionRepository} from '../services/repository/transaction-repository.service';
import {AccountRepository} from '../services/repository/account-repository.service';
import {Balance} from './balance.service';

@Injectable()
export class BalancePerAccount {
    private transactionRepository;
    private accountRepository;

    constructor(transactionRepository: TransactionRepository, accountRepository: AccountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    get(date: Date): BalancePerAccountReport {
        var total = 0;
        var firstDate = new Date(2000, 0, 1);
        var balances = [];
        var accounts = this.accountRepository.getAll();
        var totalAccounts = accounts.length;
        for (var index = 0; index < totalAccounts; index++) {
            var account = accounts[index];
            var transactions = this.transactionRepository.getFiltered('', account.uuid, firstDate, date, null);
            var balance = Balance.get(transactions);

            if (Math.round(balance) !== 0) {
               balances.push(new BalancePerAccountDto(account.name, balance));
               total += balance;
            }
        }
        return new BalancePerAccountReport(balances, total);
    }
}

export class BalancePerAccountReport {
    public balances: Array<BalancePerAccountDto>;
    public total: number;

    constructor(balances: Array<BalancePerAccountDto>, total: number) {
        this.balances = balances;
        this.total = total;
    }
}

export class BalancePerAccountDto {
    public account: string;
    public balance: number;

    constructor(account: string, balance: number) {
        this.account = account;
        this.balance = balance;
    }
}
