import {Injectable} from '@angular/core';

@Injectable()
export class MyArray {

  static findIndex(key: any, data: any): number {
    const length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i].uuid === key || (data[i].uuid === undefined && data[i] === key)) {
        return i;
      }
    }
    return -1;
  };

  static any(key: any, data: any): boolean {
    return this.findIndex(key, data) >= 0;
  }
}
