import {Injectable} from '@angular/core';

@Injectable()
export class MyDate {
  static convertToDateFromString(dateFromServer: string): Date {
    var day = parseInt(dateFromServer.substr(8, 2));
    var month = parseInt(dateFromServer.substr(5, 2)) - 1;
    var year = parseInt(dateFromServer.substr(0, 4));
    return new Date(year, month, day);
  }

  static convertToUsString(date: Date): string {
    var year = String(date.getFullYear());
    var month = this.pad((date.getMonth() + 1), 2);
    var day = this.pad(date.getDate(), 2);
    return year + '-' + month + '-' + day;
  }

  private static pad(num: number, size: number): string {
    var s = '000000000' + num;
    return s.substr(s.length - size);
  }
}
