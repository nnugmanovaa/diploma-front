import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'mfo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:any = {
    username:'+77051366182',
    password:'nnn2020$'
  }
  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth:AuthService) { 

  }

  ngOnInit(): void {
    
  }

  loginUser(){
    this.auth.login(this.loginForm).subscribe(res => {
      if(res){
        this.auth.saveUser(res);
        this.router.navigate(['/cabinet'])
      }
    })
  }

}
