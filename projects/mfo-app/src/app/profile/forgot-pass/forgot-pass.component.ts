import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  sendSms(){
    this.auth.sendSms({msisdn:this.msisdn}).subscribe(res => {
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
        this.auth.saveUser(res);
        this.router.navigate(['/cabinet'])
      }
    })
  }

}
