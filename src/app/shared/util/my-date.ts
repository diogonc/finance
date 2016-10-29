import {Injectable} from '@angular/core';

@Injectable()
export class MyDate {
  public static convertToDateFromString(dateFromServer: string): Date {
    if (dateFromServer === null) {
      return null;
    }

    let day = parseInt(dateFromServer.substr(8, 2), 10);
    let month = parseInt(dateFromServer.substr(5, 2), 10) - 1;
    let year = parseInt(dateFromServer.substr(0, 4), 10);
    return new Date(year, month, day);
  }

  public static convertToUsString(date: Date): string {
    let year = String(date.getFullYear());
    let month = this.pad((date.getMonth() + 1), 2);
    let day = this.pad(date.getDate(), 2);
    return year + '-' + month + '-' + day;
  }

  public static getFirstDayOfMonth(): Date {
    let today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }

  public static getLastDayOfMonth(): Date {
    let today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1 , 0);
  }

  public static firstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private static pad(num: number, size: number): string {
    let s = '000000000' + num;
    return s.substr(s.length - size);
  }
}
