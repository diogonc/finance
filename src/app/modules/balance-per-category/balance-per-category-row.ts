import { MyArray } from '../../shared/util/my-array';
import { MyDate } from '../../shared/util/my-date';
import { BalancePerCategoryCell } from './balance-per-category-cell';

export class BalancePerCategoryRow {
    public balances: Array<BalancePerCategoryCell>;
    public total: number;
    public average: number;

    constructor(public uuid: string,
                public category: string) {
        this.balances = [];
        this.total = 0;
    }

    public add(value: number, date: Date): void {
        const cell = this.getDateCell(date);
        cell.add(value);
        this.total += value;
        this.average = this.total / this.balances.length;
    }

    public getLastBalance(): BalancePerCategoryCell {
        return this.balances[this.balances.length];
    }

    public sortCells(): void {
        this.balances = this.balances.sort(function (cell, anotherCell) {
            return cell.date.valueOf() - anotherCell.date.valueOf();
        });
    }

    private getDateCell(date: Date): BalancePerCategoryCell {
        const index = MyArray.findIndex(MyDate.convertToUsString(date), this.balances);
        if (index === -1) {
            const cell = new BalancePerCategoryCell(date);
            this.balances.push(cell);
            return cell;
        }
        return this.balances[index];
    }
}
