import {Repository} from './repository.service';

export class AccountRepository extends Repository {
  constructor() { super('account'); }
}
