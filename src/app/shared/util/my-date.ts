import { Injectable } from '@angular/core';

@Injectable()
export class MyDate {
  public static convertToDateFromString(dateFromServer: string): Date {
    if (dateFromServer === null) {
      return null;
    }

    const day = parseInt(dateFromServer.substr(8, 2), 10);
    const month = parseInt(dateFromServer.substr(5, 2), 10) - 1;
    const year = parseInt(dateFromServer.substr(0, 4), 10);
    return new Date(year, month, day);
  }

  public static convertToUsString(date: Date): string {
    const year = String(date.getFullYear());
    const month = this.pad((date.getMonth() + 1), 2);
    const day = this.pad(date.getDate(), 2);
    return year + '-' + month + '-' + day;
  }

  public static getFirstDayOfMonth(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }

  public static getLastDayOfMonth(datePassed?: Date): Date {
    const date = typeof datePassed !== 'undefined' ?  datePassed : new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  public static firstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private static pad(num: number, size: number): string {
    const s = '000000000' + num;
    return s.substr(s.length - size);
  }
}
