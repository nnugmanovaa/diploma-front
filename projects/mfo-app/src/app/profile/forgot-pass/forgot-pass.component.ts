import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import amplitude from 'amplitude-js';
import { AuthService } from '../../core/services/auth.service'

@Component({
  selector: 'mfo-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {

  msisdn:any = null;
  code:any = "";
  newPassword:any = null;

  showSmsCode:boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth:AuthService) { 

  }

  ngOnInit(): void {
  }

  sendSms(i: number){
    this.auth.sendSms({msisdn:this.msisdn}).subscribe(res => {
      if (i == 1) {
        amplitude.getInstance().logEvent("sms resent");
      }
      this.showSmsCode = true;
    })
  }

  sendSmsCode(){
    let data = {
      msisdn: this.msisdn,
      code: this.code,
      newPassword: this.newPassword
    }
    this.auth.sendSmsCode(data).subscribe(res => {
      if(res){
        amplitude.getInstance().logEvent("sms entered", {"success": true})
        amplitude.getInstance().logEvent("restored password")
        this.auth.saveUser(res);
        this.router.navigate(['/cabinet'])
      }
    },
    error => {
      amplitude.getInstance().logEvent("sms entered", {"success": false})
    }
    )
  }

}
