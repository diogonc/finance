import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginEvent {

  private loginSource = new Subject<string>();

  logginAnnouced$ = this.loginSource.asObservable();

  announceLogin(user: string) {
    this.loginSource.next(user);
  }
}
