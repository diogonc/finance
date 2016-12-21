import {Injectable} from '@angular/core';

@Injectable()
export class SearchFilter {
    public uuid: string;
    public accounts: Array<any>;
    public categorys: Array<any>;
    public initialDate: string;
    public finalDate: string;
    public order: string;

    constructor(initialDate: string, finalDate: string, account: Array<any>,
                 category: Array<any>, order: string) {
        this.uuid = '1';
        this.accounts = account;
        this.categorys = category;
        this.initialDate = initialDate;
        this.finalDate = finalDate;
        this.order = order;
    }
}
