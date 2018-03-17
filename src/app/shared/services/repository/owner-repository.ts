import { Repository } from './repository';
import { Owner } from '../../models/owner';
import { Injectable } from '@angular/core';

@Injectable()
export class OwnerRepository extends Repository {

  constructor() { super('owner'); }

  getAll(): Array<Owner> {
    const list = this.getListOfObjects();

    const owners = [];

    for (let i = 0; i < list.length; i++) {
      owners.push(list[i] as Owner);
    }

    return this.order(owners);
  }

  private order(data: Array<Owner>): Array<Owner> {
    return data.sort(function (item, anotherItem) {
      return anotherItem.priority - item.priority;
    });
  }
}
