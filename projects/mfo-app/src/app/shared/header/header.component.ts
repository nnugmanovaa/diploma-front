import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import amplitude from 'amplitude-js';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'mfo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideLogin:boolean = false;
  showCabinet:boolean = false;
  user:any = null;
  settingsPage:boolean = false;

  showNav:boolean = false;
  headerModal:boolean = false;

  today = new Date();

  constructor(private router: Router,
              public authService:AuthService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.headerModal = false;
        if(event['url'] === '/cabinet/settings'){
          // this.settingsPage = true; otklyuchili settings
          this.settingsPage = false;
        // }else{
        //   this.settingsPage = false;
        }
        if(event['url'] !== '/'){
          this.hideLogin = true;
        }else{
          this.hideLogin = false;
        }
        this.checkLogin();
      }
    });
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  validateTime() {
    if (this.today.getHours() >= 24 || this.today.getHours() <= 6) {
      alert("Сервис недоступен в данный момент, попробуйте ещё раз в 06:00. Спасибо, что используете наш сервис.");
      this.headerModal = false;
    } else {
      this.takeLoan();
    }
  }

  checkLogin(){
    // console.log("1:" + this.authService.getUserName);
    if (this.authService.getUserName == false) {
      // console.log("2:" + this.authService.getUser);
      // console.log("3:" + this.authService.getUser.username);
      this.user = this.authService.getUser.username;
    } else {
      this.user = this.authService.getUserName;
    }

     if(this.authService.isLoggedIn){
       this.hideLogin = true;
       let lastName = this.authService.getUser.lastName ? this.authService.getUser.lastName[0] + '.' : "";
       this.user = this.authService.getUser.firstName + ' ' + lastName;
     }
  }

  logout(){
    amplitude.getInstance().logEvent("signed out");
    this.authService.logout();
    this.user = null;
    this.showNav = false;
  }

  takeLoan() {
    this.headerModal = true
    let eventProperties = {
      "position": 1
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
}
