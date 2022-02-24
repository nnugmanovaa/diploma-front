import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import amplitude from "amplitude-js";
import { environment } from '../environments/environment';

declare let gtag: Function;

@Component({
  selector: 'mfo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'mfo-app';

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
