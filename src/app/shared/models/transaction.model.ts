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

  constructor(
    uuid: string, propertyUuid: string, value: number, description: string, date: string,
    accountUuid: string, accountName: string,
    categoryUuid: string, categoryName: string, categoryType: string
  ) {
    if (uuid === null) {
      uuid = this.generateGuid();
    }

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
