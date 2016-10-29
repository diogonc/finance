import {User} from '../../models/user';
import {Transaction} from '../../models/transaction';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class FinanceApi {
    private DEFAULT_URL: string = 'http://financeserver-diogonc.rhcloud.com';
    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    getAccounts(user: User, success: (data: any) => any): void {
        this.get('account', user, success, null);
    }

    getCategories(user: User, success: (data: any) => any): void {
        this.get('category', user, success, null);
    }

    getTransactions(user: User, success: (data: any) => any, error: (data: any) => any): void {
        this.get('transaction', user, success, error);
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
        let header = new Headers();
        header.append('username', user.login);
        header.append('token', user.password);
        header.append('propertyUuid', user.property);
        return header;
    }

    private get(action: string, user: User, success: (data: any) => any, error: (data: any) => any): boolean {
        this.http
            .get(
            this.DEFAULT_URL + '/' + action + '?where={"propertyUuid":"' + user.property + '"}',
            { headers: this.createHeader(user) })
            .subscribe(
            data => this.onSuccess(data, success),
            err => this.onError(err, error));
        return false;
    }

    private post(action: string, data: any, user: User, success: (response: any) => any): void {
        this.startRequest();
        this.http
            .post(
            this.DEFAULT_URL + '/' + action, JSON.stringify(data),
            { headers: this.createHeader(user) })
            .subscribe(
            response => this.onSuccess(response, success),
            err => this.onError(err, null),
            this.endRequest);
    }

    private put(action: string, data: any, user: User, success: (response: any) => any): void {
        this.startRequest();
        this.http
            .put(
            this.DEFAULT_URL + '/' + action + '/' + data.uuid,
            JSON.stringify(data),
            { headers: this.createHeader(user) })
            .subscribe(
            response => this.onSuccess(response, success),
            err => this.onError(err, null),
            this.endRequest);
    }

    delete(action: string, uuid: string, user: User, success: (response: any) => any): void {
        this.startRequest();
        this.http
            .delete(
            this.DEFAULT_URL + '/' + action + '/' + uuid,
            { headers: this.createHeader(user) })
            .subscribe(
            response => this.onSuccess(response, success),
            err => this.onError(err, null),
            this.endRequest);
    }

    private onSuccess(response: any, success: (data: any) => any): void { success(response); }

    private onError(err: any, error: (data: any) => any) {
        if (error !== null) {
            error(err);
        }
        console.log('erro ao enviar a requisição: ' + JSON.stringify(err));
    }

    private startRequest(): void { }

    private endRequest(): void { }
}
