export class User {
  login: string;
  password: string;
  property: string;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    let firstChar = login.charAt(0);
    this.property = firstChar === 'd' ? '1' : firstChar === 'c' ? '1002' : '1003';
  }
}
