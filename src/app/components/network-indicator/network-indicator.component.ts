import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';

import { fromEvent, merge, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-network-indicator',
  templateUrl: './network-indicator.component.html',
  styleUrls: ['./network-indicator.component.css']
})
export class NetworkIndicatorComponent implements OnInit, OnDestroy {
  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  constructor() {}

  ngOnInit(): void {
    this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe(status => {
        console.log('status', status);
        this.networkStatus = status;
      });
  }
}
