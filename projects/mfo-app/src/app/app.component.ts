import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import amplitude from "amplitude-js";
import { environment } from '../environments/environment';
import { AuthService } from './core/services/auth.service';
import { TranslocoService } from '@ngneat/transloco';

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
  contact: boolean = false;
  img: string = "call-ico.svg";
  title = 'mfo-app';

  get stateName() {
    return this.media ? 'show' : 'hide'
  }
  toggle() {
    this.media = !this.media;
    this.img = this.media ? 'close-button.png' : 'call-ico.svg';
  }

  setContact = function(route: string): boolean {
    if (route === '/' || route.includes('/cabinet')) {
      return true;
    }
    return false;
  }

  // constructor(public router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       gtag('config', 'UA-174917766-1',
  //         {
  //           'page_path': event.urlAfterRedirects
  //         }
  //       );
  //     }
  //   }
  //   )
  // }

  constructor(private router: Router, private auth: AuthService, public translateService: TranslocoService) {
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          let currentRoute = this.router.url;
          this.contact = this.setContact(currentRoute);
          gtag('config', 'UA-174917766-1',
            {
              'page_path': event.urlAfterRedirects
            }
          );
        }
      }
    );
  }

  // public langKZ() {
  //   this.translateService.setActiveLang('kz');
  // }
  //
  // public langRU() {
  //   this.translateService.setActiveLang('ru');
  // }

  ngOnInit(): void {
    amplitude.getInstance().init(environment.amplitude_api_key);
  }
}
