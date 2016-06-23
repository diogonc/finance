import {Injectable} from '@angular/core';

@Injectable()
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
