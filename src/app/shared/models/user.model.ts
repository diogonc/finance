export class User {
  login: string;
  password: string;
  property: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.property = '1';
  }
}
