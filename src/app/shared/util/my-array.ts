import {Injectable} from '@angular/core';

@Injectable()
export class MyArray {

  static findIndex(key: string, data: any): number {
    var length = data.length;
    for (var i = 0; i < length; i++) {
      if (data[i].uuid === key) {
        return i;
      }
    }
    return -1;
  };
}
