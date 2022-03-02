import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import amplitude from 'amplitude-js';
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'mfo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:any = {
    username:'',
    password:''
  }
  returnUrl: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth:AuthService) { 

  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cabinet';
  }

  loginUser(){
    this.auth.login(this.loginForm).subscribe(res => {
      if(res){
        this.auth.saveUser(res);
        this.router.navigateByUrl(this.returnUrl);
      }
    })
  }

  forgetPass() {
    amplitude.getInstance().logEvent("clicked forget password")
  }
}
