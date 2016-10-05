import {Injectable} from '@angular/core';
import {MyDate} from '../../util/my-date';

@Injectable()
export class TransferVm {
  value: number;
  description: string;
  date: string;
  propertyUuid: string;
  fromAccountIndex: number;
  toAccountIndex: number;

  constructor() {
    this.value = 0;
    this.description = '';
    this.date = MyDate.convertToUsString(new Date());
    this.propertyUuid = '0';
    this.fromAccountIndex = 0;
    this.toAccountIndex = 0;
  }
}
