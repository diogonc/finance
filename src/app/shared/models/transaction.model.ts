import {MyDate} from '../util/my-date';

export class Transaction {
  uuid: string;
  value: number;
  description: string;
  date: Date;
  propertyUuid: string;
  accountUuid: string;
  accountName: string;
  categoryUuid: string;
  categoryName: string;
  categoryType: string;
  payed: string;
  errors: Array<string>;

  constructor(
    uuid: string, propertyUuid: string, value: number, description: string, date: string,
    accountUuid: string, accountName: string,
    categoryUuid: string, categoryName: string, categoryType: string
  ) {
    if (uuid === null) {
      uuid = this.generateGuid();
    }
    this.errors = [];
    this.validate(propertyUuid, value, description, date, accountUuid, accountName,
      categoryUuid, categoryName, categoryType);

    this.uuid = uuid;
    this.propertyUuid = propertyUuid;
    this.value = value;
    this.description = description;
    this.date = MyDate.convertToDateFromString(date);
    this.accountUuid = accountUuid;
    this.accountName = accountName;
    this.categoryUuid = categoryUuid;
    this.categoryName = categoryName;
    this.categoryType = categoryType;
    this.payed = 'true';
  }

  isValid(): boolean {
    return this.errors.length == 0;
  }

  private validate(propertyUuid: string, value: number, description: string, date: string,
    accountUuid: string, accountName: string,
    categoryUuid: string, categoryName: string, categoryType: string): void {

    this.verifyField(propertyUuid, 'Propriedade é obrigatória');
    this.verifyField(value, 'Valor é obrigatório');
    this.verifyField(description, 'Descrição é obrigatória');
    this.verifyField(date, 'Data é obrigatória');
    this.verifyField(accountUuid, 'Conta é obrigatória');
    this.verifyField(accountName, 'Nome da conta é obrigatória');
    this.verifyField(categoryUuid, 'Categoria é obrigatória');
    this.verifyField(categoryName, 'Nome da categoria é obrigatória');
    this.verifyField(categoryType, 'Tipo da categoria é obrigatória');
  };

  private verifyField(field: any, message: string) {
    if (field === null || field === '' || field <= 0) {
      this.errors.push(message);
    }
  }

  private generateGuid(): string {
    var s = [];
    var hexDigits = '0123456789abcdef';
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '"-';
    return s.join('');
  };
}
