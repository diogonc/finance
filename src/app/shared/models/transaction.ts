import { MyDate } from '../util/my-date';
import { Account } from './account';
import { Category } from './category';

export class Transaction {
  uuid: string;
  value: number;
  description: string;
  date: Date;
  propertyUuid: string;
  account: Account;
  category: Category;
  errors: Array<string>;

  constructor(
    uuid: string, propertyUuid: string, value: number, description: string, date: string, account: Account, category: Category
  ) {
    this.errors = [];
    this.validate(propertyUuid, value, description, date, account, category);

    this.uuid = uuid;
    this.propertyUuid = propertyUuid;
    this.value = value;
    this.description = description;
    this.date = MyDate.convertToDateFromString(date);
    this.account = account;
    this.category = category;
  }

  isValid(): boolean {
    return this.errors.length === 0;
  }

  private validate(propertyUuid: string, value: number, description: string, date: string,
    account: Account, category: Category): void {

    this.verifyField(propertyUuid, 'Propriedade é obrigatória');
    this.verifyField(value, 'Valor é obrigatório');
    this.verifyField(description, 'Descrição é obrigatória');
    this.verifyField(date, 'Data é obrigatória');
    this.verifyField(account, 'Conta é obrigatória');
    this.verifyField(category, 'Categoria é obrigatória');
  };

  private verifyField(field: any, message: string) {
    if (field === null || field === '' || field <= 0) {
      this.errors.push(message);
    }
  }
}
