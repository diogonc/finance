import {Injectable} from '@angular/core';

@Injectable()
export class Category {
  uuid: string;
  name: string;
  type: string;

  constructor(uuid: string, name: string, type: string) {
    this.uuid = uuid;
    this.name = name;
    this.type = type;
  }
}
