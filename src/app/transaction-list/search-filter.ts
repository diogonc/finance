import {Injectable} from '@angular/core';

@Injectable()
export class SearchFilter {
    public uuid: string;
    public account: string;
    public category: string;
    public initialDate: string;
    public finalDate: string;
    public order: string;

    constructor(initialDate: string, finalDate: string, account: string,
                 category: string, order: string) {
        this.uuid = '1';
        this.account = account;
        this.category = category;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
        this.order = order;
    }
}
