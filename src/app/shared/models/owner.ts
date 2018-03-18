export class Owner {
  uuid: string;
  name: string;
  priority: number;
  userLogin: string;

  constructor(uuid: string, name: string, priority: number , userLogin: string) {
    this.uuid = uuid;
    this.name = name;
    this.priority = priority;
    this.userLogin = userLogin;
  }
}
