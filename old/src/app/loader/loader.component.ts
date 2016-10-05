import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {LoadEvent} from '../shared/events/load.event';

@Component({
  moduleId: module.id,
  selector: 'loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.css'],
  directives: [CORE_DIRECTIVES]
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
