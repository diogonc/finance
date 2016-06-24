import {Injectable} from '@angular/core';

@Injectable()
export class MyDate {
  public static convertToDateFromString(dateFromServer: string): Date {
    if (dateFromServer === null) {
      return null;
    }

    var day = parseInt(dateFromServer.substr(8, 2));
    var month = parseInt(dateFromServer.substr(5, 2)) - 1;
    var year = parseInt(dateFromServer.substr(0, 4));
    return new Date(year, month, day);
  }

  public static convertToUsString(date: Date): string {
    var year = String(date.getFullYear());
    var month = this.pad((date.getMonth() + 1), 2);
    var day = this.pad(date.getDate(), 2);
    return year + '-' + month + '-' + day;
  }

  public static getFirstDayOfMonth(): Date {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }

  public static getLastDayOfMonth(): Date {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1 , 0);
  }

  public static firstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private static pad(num: number, size: number): string {
    var s = '000000000' + num;
    return s.substr(s.length - size);
  }
}
