import {Injectable} from '@angular/core';
import {TransactionRepository} from '../services/repository/transaction-repository.service';
import {Transaction} from '../models/transaction.model';
import {MyArray} from '../util/my-array';
import {MyDate} from '../util/my-date';

@Injectable()
export class BalancePerCategory {
    private transactionRepository;

    constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    get(initialDate: Date, finalDate: Date): BalancePerCategoryReport {
        var transactions = this.transactionRepository.getFiltered('', '', initialDate, finalDate, null);
        var totalTransactions = transactions.length;
        var balancePerCategory = new BalancePerCategoryReport();

        for (var index = 0; index < totalTransactions; index++) {
            var transaction = transactions[index];
            balancePerCategory.addTransaction(transaction);
        }
        return new BalancePerCategoryReport();
    }
}

export class BalancePerCategoryReport {
    public credits: Array<BalancePerCategoryRow>;
    public debits: Array<BalancePerCategoryRow>;
    public totalCredits: BalancePerCategoryRow;
    public totalDebits: BalancePerCategoryRow;
    public totalBalance: BalancePerCategoryRow;

    constructor() {
        this.credits = [];
        this.debits = [];
        this.totalCredits = new BalancePerCategoryRow('0', 'Créditos');
        this.totalDebits = new BalancePerCategoryRow('1', 'Débitos');
        this.totalBalance = new BalancePerCategoryRow('2', 'Saldo');
    }

    public addTransaction(transaction: Transaction): void {
        var categoryRow;
        if (transaction.categoryType === 'credit') {
            categoryRow = this.getCreditCategoriesRows(transaction.uuid, transaction.categoryName);
            categoryRow.addTransaction(transaction);
        } else if (transaction.categoryType === 'debit') {
            categoryRow = this.getDebitCategoriesRows(transaction.uuid, transaction.categoryName);
            categoryRow.addTransaction(transaction);
        }
    }

    private getCreditCategoriesRows(uuid: string, categoryName: string): BalancePerCategoryRow {
        return this.getCategoryRow(uuid, categoryName, this.credits);
    }

    private getDebitCategoriesRows(uuid: string, categoryName: string): BalancePerCategoryRow {
        return this.getCategoryRow(uuid, categoryName, this.debits);
    }

    private getCategoryRow(uuid: string, categoryName: string, array: Array<BalancePerCategoryRow>):
        BalancePerCategoryRow {
        var categoryIndex = MyArray.findIndex(uuid, this.credits);
        if (categoryIndex === -1) {
            var creditRow = new BalancePerCategoryRow(uuid, categoryName);
            this.addCreditRow(creditRow);
            return creditRow;
        }
        return this.credits[categoryIndex];
    }

    private addCreditRow(categoryRow: BalancePerCategoryRow): void {
        this.credits.push(categoryRow);
    }
}

export class BalancePerCategoryRow {
    public uuid: string;
    public category: string;
    public balances: Array<BalancePerCategoryCell>;
    public total: number;

    constructor(uuid: string, category: string) {
        this.uuid = uuid;
        this.category = category;
        this.balances = [];
        this.total = 0;
    }

    addTransaction(transaction: Transaction): void {
        var date = MyDate.firstDayOfMonth(transaction.date);
        var cell = this.getDateCell(date);

        cell.add(transaction.value);
        this.total += transaction.value;
    }

    private getDateCell(date: Date):
        BalancePerCategoryCell {
        var index = MyArray.findIndex(date, this.balances);
        if (index === -1) {
            var cell = new BalancePerCategoryCell(date);
            this.addCell(cell);
            return cell;
        }
        return this.balances[index];
    }

    private addCell(balancePerCategoryCell: BalancePerCategoryCell): void {
        this.balances.push(balancePerCategoryCell);
        this.total += balancePerCategoryCell.balance;
    }
}

export class BalancePerCategoryCell {
    public balance: number;
    public date: Date;
    public uuid: Date;

    constructor(date: Date) {
        this.balance = 0;
        this.date = date;
        this.uuid = date;
    }

    public add(value: number) {
        this.balance += value;
    }
}
