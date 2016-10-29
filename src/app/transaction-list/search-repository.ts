import { Injectable } from '@angular/core';
import { Repository } from '../shared/services/repository/repository';

@Injectable()
export class SearchRepository extends Repository {

    constructor() { super('transaction-list-search'); }
}
