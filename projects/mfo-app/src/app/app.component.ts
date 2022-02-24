import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import amplitude from "amplitude-js";
import { environment } from '../environments/environment';

declare let gtag: Function;
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'mfo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('100ms ease-out')),
      transition('hide => show', animate('600ms ease-out')),
    ])
  ]
})

export class AppComponent implements OnInit {
  media: boolean = false;
  img: string = "call-ico.svg";
  title = 'mfo-app';

  get stateName() {
    return this.media ? 'show' : 'hide'
  }
  toggle() {
    this.media = !this.media;
    this.img = this.media ? 'close-button.png' : 'call-ico.svg';

  }

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-174917766-1',
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    }
    )
  }
  ngOnInit(): void {
    amplitude.getInstance().init(environment.amplitude_api_key);
  }
}
