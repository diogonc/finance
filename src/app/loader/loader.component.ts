import {Component, OnInit} from '@angular/core';
import {LoadEvent} from '../events/load-event';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit {
  public isLoading: boolean;
  private loadEvent: LoadEvent;

  constructor(loadEvent: LoadEvent) {
    this.loadEvent = loadEvent;
  }

  ngOnInit() {
    this.isLoading = false;

    this.loadEvent.loadStartAnnouced$.subscribe(
      load => {
        this.isLoading = true;
      });

    this.loadEvent.loadEndAnnouced$.subscribe(
      load => {
        this.isLoading = false;
      });
  }
}