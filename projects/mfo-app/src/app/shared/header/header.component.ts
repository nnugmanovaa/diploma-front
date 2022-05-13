import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import amplitude from 'amplitude-js';
import { AuthService } from '../../core/services/auth.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'mfo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideLogin: boolean = false;
  showCabinet: boolean = false;
  user: any = null;
  settingsPage: boolean = false;

  showNav: boolean = false;
  headerModal: boolean = false;
  headerModalPDL: boolean = false;

  today = new Date();

  constructor(private router: Router,
    public authService: AuthService,
    public translateService: TranslocoService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.headerModal = false;
        this.headerModalPDL = false;
        if (event['url'] === '/cabinet/settings') {
          // this.settingsPage = true; otklyuchili settings
          this.settingsPage = false;
          // }else{
          //   this.settingsPage = false;
        }
        if (event['url'] !== '/') {
          this.hideLogin = true;
        } else {
          this.hideLogin = false;
        }
        this.checkLogin();
      }
    });
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
    // console.log("1:" + this.authService.getUserName);
    if (this.authService.getUserName == false) {
      // console.log("2:" + this.authService.getUser);
      // console.log("3:" + this.authService.getUser.username);
      this.user = this.authService.getUser.username;
    } else {
      this.user = this.authService.getUserName;
    }

    if (this.authService.isLoggedIn) {
      this.hideLogin = true;
      let lastName = this.authService.getUser.lastName ? this.authService.getUser.lastName[0] + '.' : "";
      this.user = this.authService.getUser.firstName + ' ' + lastName;
    }
  }

  logout() {
    amplitude.getInstance().logEvent("signed out");
    this.authService.logout();
    this.user = null;
    this.showNav = false;
  }

  takePDL() {
    this.headerModalPDL = true
    let eventProperties = {
      "position": 1
    };
    amplitude.getInstance().logEvent("clicked get pdl loan", eventProperties)
  }

  takeLoan() {
    this.headerModal = true
    let eventProperties = {
      "position": 2
    };
    amplitude.getInstance().logEvent("clicked get loan", eventProperties)
  }

  howToGet() {
    amplitude.getInstance().logEvent("clicked how to get")
  }

  howToPay() {
    amplitude.getInstance().logEvent("clicked how to repay")
  }

  conditions() {
    amplitude.getInstance().logEvent("clicked show conditions")
  }

  signIn() {
    let eventProperties = {
      "position": 1
    }
    amplitude.getInstance().logEvent("clicked sign in", eventProperties);
  }

  cabinet() {
    amplitude.getInstance().logEvent("clicked cabinet");
  }

  public langKZ() {
    this.translateService.setActiveLang('kz');
  }

  public langRU() {
    this.translateService.setActiveLang('ru');
  }
}
