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
        var categoryRow: BalancePerCategoryRow;
        var date = MyDate.firstDayOfMonth(transaction.date);
        var value = transaction.value;
        if (transaction.categoryType === 'credit') {
            categoryRow = this.getCreditCategoriesRows(transaction.categoryUuid, transaction.categoryName);

            categoryRow.add(value, date);
            this.totalCredits.add(value, date);
            this.totalBalance.add(value, date);
        } else if (transaction.categoryType === 'debit') {
            categoryRow = this.getDebitCategoriesRows(transaction.categoryUuid, transaction.categoryName);

            categoryRow.add(value, date);
            this.totalDebits.add(value, date);
            this.totalBalance.add((value * -1), date);
        }
    }

    public fillEmptyCells() {
        this.fillEmptyCellsFromRows(this.credits);
        this.fillEmptyCellsFromRows(this.debits);
        this.fillEmptyCellsInARow(this.totalCredits);
        this.fillEmptyCellsInARow(this.totalDebits);
    }

    private fillEmptyCellsFromRows(list: Array<BalancePerCategoryRow>) {
        var totalCredits = list.length;
        for (var i = 0; i < totalCredits; i++) {
            var row = list[i];
            this.fillEmptyCellsInARow(row);
        }
    }

    private fillEmptyCellsInARow(row: BalancePerCategoryRow) {
            var totalMonths = this.totalBalance.balances.length;
            for (var i = 0; i < totalMonths; i++) {
                var month = this.totalBalance.balances[i].date;
                row.add(0, month);
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
        var categoryIndex = MyArray.findIndex(uuid, array);
        if (categoryIndex === -1) {
            var row = new BalancePerCategoryRow(uuid, categoryName);
            array.push(row);
            return row;
        }
        return array[categoryIndex];
    }
}
