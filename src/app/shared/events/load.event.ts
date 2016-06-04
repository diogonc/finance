import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LoadEvent {

  private loadStartSource = new Subject<string>();
  private loadEndSource = new Subject<string>();

  loadStartAnnouced$ = this.loadStartSource.asObservable();
  loadEndAnnouced$ = this.loadEndSource.asObservable();

  announceLoadStart(user: string) {
    this.loadStartSource.next(user);
  }

  announceLoadEnd(user: string) {
    this.loadEndSource.next(user);
  }
}
