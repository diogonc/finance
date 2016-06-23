import {Injectable} from '@angular/core';
import {Transaction} from '../models/transaction.model';
import {MyArray} from '../util/my-array';
import {BalancePerCategoryCell} from './balance-per-category-cell';

@Injectable()
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

    add(value: number, date: Date): void {
        var cell = this.getDateCell(date);
        cell.add(value);
        this.total += value;
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