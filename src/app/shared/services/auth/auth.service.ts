import {Injectable} from '@angular/core';
import {UserRepository} from '../repository/userRepository.service';

@Injectable()
export class AuthService {
  private _userRepository: UserRepository;

  constructor(repository: UserRepository) { this._userRepository = repository; }

  isLogged(): boolean {
    var user = this._userRepository.getUser();
    return (user !== undefined && user !== null);
  }
}
