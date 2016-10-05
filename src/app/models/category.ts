import {Injectable} from '@angular/core';

@Injectable()
export class Category {
  uuid: string;
  name: string;
  type: string;
  priority: number;

  constructor(uuid: string, name: string, type: string, priority: number) {
    this.uuid = uuid;
    this.name = name;
    this.type = type;
    this.priority = priority;
  }
}
