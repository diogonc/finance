import {Injectable} from '@angular/core';

@Injectable()
export class Category {
  uuid: string;
  name: string;
  categoryType: string;
  priority: number;
  propertyUuid: string;
  errors: Array<string>;

  constructor(uuid: string, name: string, type: string, priority: number) {
    this.uuid = uuid;
    this.name = name;
    this.categoryType = type;
    this.priority = priority;
  }

  isValid(): boolean {
    return true;
  }
}
