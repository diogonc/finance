import {Injectable} from '@angular/core';

@Injectable()
export class MyArray {

  static findIndex(key: any, data: any): number {
    let length = data.length;
    for (let i = 0; i < length; i++) {
      if (data[i].uuid === key) {
        return i;
      }
    }
    return -1;
  };
}
