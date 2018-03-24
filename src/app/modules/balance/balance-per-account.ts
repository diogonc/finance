import { Injectable } from '@angular/core';
import { TransactionRepository } from '../../shared/services/repository/transaction-repository';
import { AccountRepository } from '../../shared/services/repository/account-repository';
import { Balance } from '../../shared/services/balance/balance';
import { Owner } from '../../shared/models/owner';
import { MyArray } from '../../shared/util/my-array';

@Injectable()
export class BalancePerAccount {
    constructor(
        private transactionRepository: TransactionRepository,
        private accountRepository: AccountRepository) {
    }

    get(date: Date): BalancePerAccountReport {
        let total = 0;
        const firstDate = new Date(2000, 0, 1);
        const accounts = this.accountRepository.getAll();
        const owners = [];
        const totalAccounts = accounts.length;
        for (let index = 0; index < totalAccounts; index++) {
            const account = accounts[index];
            const transactions = this.transactionRepository.getFiltered([], [account.uuid], firstDate, date, '', null);
            const balance = Balance.get(transactions);
            if (Math.round(balance) !== 0) {
                const owner = account.owner !== null ? account.owner : new Owner('0', 'Principal', 1, 'principal');
                let ownerIndex = MyArray.findIndex(owner.uuid, owners);

                if (ownerIndex === -1) {
                    owners.push(new BalancePerOwner(owner.uuid, owner.name));
                    ownerIndex = MyArray.findIndex(owner.uuid, owners);
                }
                const balancePerOwner = owners[ownerIndex];
                balancePerOwner.AddBalancePerAccount(new BalancePerAccountDto(account.name, balance));
                total += balance;
            }
        }
        return new BalancePerAccountReport(owners, total);
    }
}

export class BalancePerAccountReport {
    public balances: Array<BalancePerOwner>;
    public total: number;

    constructor(balances: Array<BalancePerOwner>, total: number) {
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

export class BalancePerOwner {
    public uuid: string;
    public owner: string;
    public balancesPerAccount: Array<BalancePerAccountDto>;
    public total: number;

    constructor(uuid: string, owner: string) {
        this.uuid = uuid;
        this.owner = owner;
        this.total = 0;
        this.balancesPerAccount = [];
    }

    AddBalancePerAccount(balance: BalancePerAccountDto): void {
        this.balancesPerAccount.push(balance);
        this.total += balance.balance;
    }
}
