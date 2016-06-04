import {User} from '../../models/user.model';
import {Transaction} from '../../models/transaction.model';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class FinanceApi {
    private DEFAULT_URL: string = 'http://financeserver-diogonc.rhcloud.com';
    private _http: Http;

    constructor(http: Http) {
        this._http = http;
    }

    getAccounts(user: User, success: (data: any) => any): void {
        this.get('account', user, success);
    }

    getCategories(user: User, success: (data: any) => any): void {
        this.get('category', user, success);
    }

    getTransactions(user: User, success: (data: any) => any): void {
        this.get('transaction', user, success);
    }

    saveTransaction(transaction: Transaction, user: User, success: (data: any) => any): void {
        this.post('transaction', transaction, user, success);
    }

    updateTransaction(transaction: Transaction, user: User, success: (data: any) => any): void {
        this.put('transaction', transaction, user, success);
    }

    deleteTransaction(transactionUuid: string, user: User, success: (data: any) => any): void {
        this.delete('transaction', transactionUuid, user, success);
    }

    private createHeader(user: User): Headers {
        var header = new Headers();
        header.append('username', user.login);
        header.append('token', user.password);
        header.append('propertyUuid', user.property);
        return header;
    }

    private get(action: string, user: User, success: (data: any) => any): boolean {
        this._http
            .get(
            this.DEFAULT_URL + '/' + action + '?where={"propertyUuid":"' + user.property + '"}',
            { headers: this.createHeader(user) })
            .subscribe(
            data => this.onSuccess(data, success),
            err => this.logError(err));
        return false;
    }

    private post(action: string, data: any, user: User, success: (response: any) => any): void {
        this.startRequest();
        this._http
            .post(
            this.DEFAULT_URL + '/' + action, JSON.stringify(data),
            { headers: this.createHeader(user) })
            .subscribe(
            response => this.onSuccess(response, success),
            err => this.logError(err),
            this.endRequest);
    }

    private put(action: string, data: any, user: User, success: (response: any) => any): void {
        this.startRequest();
        this._http
            .put(
            this.DEFAULT_URL + '/' + action + '/' + data.uuid,
            JSON.stringify(data),
            { headers: this.createHeader(user) })
            .subscribe(
            response => this.onSuccess(response, success),
            err => this.logError(err),
            this.endRequest);
    }

    delete(action: string, uuid: string, user: User, success: (response: any) => any): void {
        this.startRequest();
        this._http
            .delete(
            this.DEFAULT_URL + '/' + action + '/' + uuid,
            { headers: this.createHeader(user) })
            .subscribe(
            response => this.onSuccess(response, success),
            err => this.logError(err),
            this.endRequest);
    }

    private onSuccess(response: any, success: (data: any) => any): void { success(response); }

    private logError(err) { console.log('erro ao enviar a requisição: ' + JSON.stringify(err)); }

    private startRequest(): void { }

    private endRequest(): void { }
}
