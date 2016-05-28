import {User} from '../../models/user.model';
import {Transaction} from '../../models/transaction.model';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class FinanceApi {
    private DEFAULT_URL: string = 'http://financeserver-diogonc.rhcloud.com';
    private _http: Http;

    constructor(http: Http) { this._http = http; }

    createHeader(user: User): Headers {
        var header = new Headers();
        header.append('username', user.login);
        header.append('token', user.password);
        header.append('propertyUuid', user.property);
        return header;
    }

    getAccounts(user: User, success: (data: any) => any): boolean {
        this._http
            .get(
            this.DEFAULT_URL + '/account?where={"propertyUuid":"' + user.property + '"}',
            { headers: this.createHeader(user) })
            .subscribe(data => success(data), err => this.logError(err), () => console.log('Complete'));
        return false;
    }

    getCategories(user: User, success: (data: any) => any): boolean {
        this._http
            .get(
            this.DEFAULT_URL + '/category?where={"propertyUuid":"' + user.property + '"}',
            { headers: this.createHeader(user) })
            .subscribe(data => success(data), err => this.logError(err), () => console.log('Complete'));
        return false;
    }

    getTransactions(user: User, success: (data: any) => any): boolean {
        this._http
            .get(
            this.DEFAULT_URL + '/transaction?where={"propertyUuid":"' + user.property + '"}',
            { headers: this.createHeader(user) })
            .subscribe(
            data => this.onSuccess(data, success), err => this.logError(err),
            () => console.log('Complete'));
        return false;
    }

    saveTransaction(transaction: Transaction, user: User, success: (data: any) => any): void {
        this._http
            .post(
            this.DEFAULT_URL + '/transaction', JSON.stringify(transaction),
            { headers: this.createHeader(user) })
            .subscribe(
            data => this.onSuccess(data, success), err => this.logError(err),
            () => console.log('Complete'));
    }

    updateTransaction(transaction: Transaction, user: User, success: (data: any) => any): void {
        this._http
            .put(
            this.DEFAULT_URL + '/transaction/' + transaction.uuid,
            JSON.stringify(transaction),
            { headers: this.createHeader(user) })
            .subscribe(
            data => this.onSuccess(data, success), err => this.logError(err),
            () => console.log('Complete'));
    }

    deleteTransaction(transactionUuid: string, user: User, success: (data: any) => any): void {
        this._http
            .delete(
            this.DEFAULT_URL + '/transaction/' + transactionUuid,
            { headers: this.createHeader(user) })
            .subscribe(
            data => this.onSuccess(data, success), err => this.logError(err),
            () => console.log('Complete'));
    }

    onSuccess(response: any, success: (data: any) => any): void { success(response); }

    logError(err) { console.log('erro ao enviar a requisição: ' + JSON.stringify(err)); }
}
