import {Injectable} from '@angular/core';
import {MyArray} from '../util/my-array';
import {MyDate} from '../util/my-date';
import {BalancePerCategoryCell} from './balance-per-category-cell';

@Injectable()
export class BalancePerCategoryRow {
    public uuid: string;
    public category: string;
    public balances: Array<BalancePerCategoryCell>;
    public total: number;
    public average: number;

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
        this.average = this.total / this.balances.length;
    }

    private getDateCell(date: Date): BalancePerCategoryCell {
        var index = MyArray.findIndex(MyDate.convertToUsString(date), this.balances);
        if (index === -1) {
            var cell = new BalancePerCategoryCell(date);
            this.balances.push(cell);
            return cell;
        }
        return this.balances[index];
    }
}
