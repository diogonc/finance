import {Injectable} from '@angular/core';
import {TransactionRepository} from '../../shared/services/repository/transaction-repository';
import {AccountRepository} from '../../shared/services/repository/account-repository';
import {Balance} from '../../shared/services/balance/balance';

@Injectable()
export class BalancePerAccount {
    private transactionRepository;
    private accountRepository;

    constructor(transactionRepository: TransactionRepository, accountRepository: AccountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    get(date: Date): BalancePerAccountReport {
        let total = 0;
        let firstDate = new Date(2000, 0, 1);
        let balances = [];
        let accounts = this.accountRepository.getAll();
        let totalAccounts = accounts.length;
        for (let index = 0; index < totalAccounts; index++) {
            let account = accounts[index];
            let transactions = this.transactionRepository.getFiltered('', [account.uuid], firstDate, date, null);
            let balance = Balance.get(transactions);

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
