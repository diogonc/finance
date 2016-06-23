import {Injectable} from '@angular/core';
import {Transaction} from '../models/transaction.model';
import {MyArray} from '../util/my-array';
import {MyDate} from '../util/my-date';
import {BalancePerCategoryRow} from './balance-per-category-row';

@Injectable()
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
        var date = MyDate.firstDayOfMonth(transaction.date);
        var value = transaction.value;
        if (transaction.categoryType === 'credit') {
            categoryRow = this.getCreditCategoriesRows(transaction.uuid, transaction.categoryName);

            categoryRow.addTransaction(transaction, date);
            this.totalCredits.add(value, date);
            this.totalBalance.add(value, date);
        } else if (transaction.categoryType === 'debit') {
            categoryRow = this.getDebitCategoriesRows(transaction.uuid, transaction.categoryName);

            categoryRow.addTransaction(transaction, date);
            this.totalDebits.add(value, date);
            this.totalBalance.add((value * -1), date);
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