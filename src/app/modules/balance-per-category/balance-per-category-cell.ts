import {MyDate} from '../../shared/util/my-date';

export class BalancePerCategoryCell {
    public balance: number;
    public date: Date;
    public uuid: string;

    constructor(date: Date) {
        this.balance = 0;
        this.date = date;
        this.uuid = MyDate.convertToUsString(date);
    }

    public add(value: number) {
        this.balance += value;
    }
}
