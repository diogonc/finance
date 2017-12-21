import { Repository } from './repository';
import { Group } from '../../models/group';

export class GroupRepository extends Repository {
  constructor() { super('group'); }

  getAll(): Array<Group> {
    const list = this.getListOfObjects();
    const itens = [];

    for (let i = 0; i < list.length; i++) {
      itens.push(list[i] as Group);
    }

    return this.sortByPriorityAndName(itens);
  }

  private sortByPriorityAndName(data: Array<Group>): Array<Group> {
    return data.sort(function (item, anotherItem) {
      if (anotherItem.priority - item.priority !== 0) {
        return anotherItem.priority - item.priority;
      }
      return anotherItem.name.localeCompare(item.name);
    });
  }
}
