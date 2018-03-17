export class Owner {
  uuid: string;
  name: string;
  priority: number;

  constructor(uuid: string, name: string, priority: number) {
    this.uuid = uuid;
    this.name = name;
    this.priority = priority;
  }
}
