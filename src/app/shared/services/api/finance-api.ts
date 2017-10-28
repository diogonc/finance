import { User } from '../../models/user';
import { UserRepository } from '../../services/repository/user-repository';
import { Transaction } from '../../models/transaction';
import { Category } from '../../models/category';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class FinanceApi {
    // private DEFAULT_URL: string = 'http://localhost:5000/api/';
    private DEFAULT_URL: string = 'http://corefinance.azurewebsites.net/api/';
    private http: Http;
    private userRepository: UserRepository;

    constructor(http: Http, userRepository: UserRepository) {
        this.http = http;
        this.userRepository = userRepository;
    }

    getAccounts(success: (data: any) => any): void {
        this.get('account', success, null);
    }

    getCategories(success: (data: any) => any): void {
        this.get('category', success, null);
    }

    getTransactions(success: (data: any) => any, error: (data: any) => any): void {
        this.get('transaction', success, error);
    }

    saveTransaction(transaction: Transaction, success: (data: any) => any,
        error: (data: any) => any): void {
        this.post('transaction', transaction, success, error);
    }

    updateTransaction(transaction: Transaction, success: (data: any) => any,
        error: (data: any) => any): void {
        this.put('transaction', transaction, success, error);
    }

    deleteTransaction(transactionUuid: string, success: (data: any) => any,
        error: (data: any) => any): void {
        this.delete('transaction', transactionUuid, success, error);
    }

    saveCategory(category: Category, success: (data: any) => any,
        error: (data: any) => any): void {
        this.post('category', category, success, error);
    }

    updateCategory(category: Category, success: (data: any) => any,
        error: (data: any) => any): void {
        this.put('category', category, success, error);
    }

    deleteCategory(categoryUuid: string, success: (data: any) => any,
        error: (data: any) => any): void {
        this.delete('category', categoryUuid, success, error);
    }

    private createHeader(): Headers {
        const user = this.userRepository.getUser();

        const header = new Headers();
        header.append('username', user.login);
        header.append('token', user.password);
        header.append('propertyUuid', user.property);
        header.append('Content-type', 'application/json');
        return header;
    }

    private get(action: string, success: (data: any) => any, error: (data: any) => any): boolean {
        this.http
            .get(
            this.DEFAULT_URL + action,
            { headers: this.createHeader() })
            .subscribe(
            data => this.onSuccess(data, success),
            err => this.onError(err, error));
        return false;
    }

    private post(action: string, data: any, success: (response: any) => any,
        error: (data: any) => any): void {
        this.http
            .post(
            this.DEFAULT_URL + action, JSON.stringify(data),
            { headers: this.createHeader() })
            .subscribe(
            response => this.onSuccess(response, success),
            err => this.onError(err, error));
    }

    private put(action: string, data: any, success: (response: any) => any,
        error: (data: any) => any): void {
        success(1);
        this.http
            .put(
            this.DEFAULT_URL + action + '/' + data.uuid,
            JSON.stringify(data),
            { headers: this.createHeader() })
            .subscribe(
            response => this.onSuccess(response, success),
            err => this.onError(err, error));
    }

    delete(action: string, uuid: string, success: (response: any) => any,
        error: (data: any) => any): void {
        success(1);
        this.http
            .delete(
            this.DEFAULT_URL + action + '/' + uuid,
            { headers: this.createHeader() })
            .subscribe(
            response => this.onSuccess(response, success),
            err => this.onError(err, error));
    }

    private onSuccess(response: any, success: (data: any) => any): void { success(response); }

    private onError(err: any, error: (data: any) => any) {
        if (error !== null) {
            error(err);
        }
        console.log('erro ao enviar a requisição: ' + JSON.stringify(err));
    }
}
