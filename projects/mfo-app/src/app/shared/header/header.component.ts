import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
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
  constructor(private router: Router,
              public authService:AuthService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if(event['url'] === '/cabinet/settings'){
          this.settingsPage = true;
        }else{
          this.settingsPage = false;
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

  checkLogin(){
     this.user = this.authService.getUser;
     if(this.authService.isLoggedIn){
       this.hideLogin = true;
     }
  }

  logout(){
    this.authService.logout();
    this.user = null;
  }

}
