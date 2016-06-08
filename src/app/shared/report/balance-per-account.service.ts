import {Injectable} from '@angular/core';
import {TransactionRepository} from '../services/repository/transactionRepository.service';
import {AccountRepository} from '../services/repository/accountRepository.service';
import {Balance} from './balance.service';

@Injectable()
export class BalancePerAccount {
    private _transactionRepository;
    private _accountRepository;

    constructor(transactionRepository: TransactionRepository, accountRepository: AccountRepository) {
        this._transactionRepository = transactionRepository;
        this._accountRepository = accountRepository;
    }

    get(date: Date): BalancePerAccountReportDto {
        var total = 0;
        var firstDate = new Date(2000, 0, 1);
        var balances = [];
        var accounts = this._accountRepository.getAll();
        var totalAccounts = accounts.length;
        for (var index = 0; index < totalAccounts; index++) {
            var account = accounts[index];
            var transactions = this._transactionRepository.getFiltered('', account.uuid, firstDate, date, null);
            var balance = Balance.get(transactions);

            if (Math.round(balance) !== 0) {
               balances.push(new BalancePerAccountDto(account.name, balance));
               total += balance;
            }
        }
        return new BalancePerAccountReportDto(balances, total);
    }
}

export class BalancePerAccountReportDto {
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
