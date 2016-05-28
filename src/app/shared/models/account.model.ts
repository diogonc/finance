import {Injectable} from '@angular/core';

@Injectable()
export class Account {
  uuid: string;
  name: string;

  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }
}
