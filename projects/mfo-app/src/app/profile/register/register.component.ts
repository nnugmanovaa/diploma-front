import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../core/services/register.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';

declare function loadVideo():any;

@Component({
  selector: 'mfo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:any = {
    msisdn:null
  }

  pdfForm:any = {
    firstName: null,
    iin: null,
    lastName: null,
    patronymic: null,
    phone: null,
  }

  file:any = null;

  code:any = null;
  showSMSModal:boolean = false;

  veriface:boolean = false;
  signUpShow:boolean = false;
  singUpForm:any = {
    "code": null,
    "msisdn": null,
    "password": null,
    "confirmPassword": null
  }

  verifaceLoad:boolean = true;

  vfImage:boolean = true;
  qparams:any = null;

  requestId:any = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private registerService:RegisterService,
              private toastr: ToastrService,
              private auth:AuthService) { 

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.qparams = queryParams;
    });
    fromEvent(window,'build').subscribe((event:any)=>{
       this.showSignUP()
    })
  }

  veriLive(){
    this.verifaceLoad = false;
  }

  showSignUP(){
    let image = (<HTMLInputElement>document.getElementById("results")).value;
    this.registerService.sendImage(this.requestId, image).subscribe(res => {
      this.getPersData();
    }, error => {
      this.registerService.resendImage(this.requestId, image).subscribe(res => {
        this.getPersData();
      })
    })
  }

  getPersData(){
    this.registerService.getInfoByIIN(this.requestId).subscribe(res => {
      localStorage.setItem('pinfo', JSON.stringify(res));
      // this.qparams['requestId'] = this.requestId;
      this.router.navigate(['/profile/steps'], { queryParams: {...this.qparams, requestId:this.requestId}})
    });
  }

  createRequest(){
    this.registerService.getLoanRequestId(this.pdfForm).subscribe(res => {
      this.requestId = res.requestId
      this.veriface = true;
    })
  }

  signUp(){
    if(this.singUpForm.password !== this.singUpForm.confirmPassword){
      this.toastr.error('Пароль не изменён, так как новый пароль повторен неправильно.', 'Ошибка!');
      return;
    }
    this.singUpForm.code = this.code;
    this.singUpForm.msisdn = this.registerForm.msisdn;
    this.registerService.signUp(this.singUpForm).subscribe(res => {
      if(res){
        this.auth.saveUser(res);
        this.createRequest();
      }
    })
  }

  registerUser(){
    this.registerService.sendOTP(this.registerForm).subscribe(res => {
      this.getConsent();
    })
  }

  getConsent(){
    this.pdfForm.phone = this.registerForm.msisdn;
    this.registerService.getConsent(this.pdfForm).subscribe(res => {
      this.file = URL.createObjectURL(res);
      this.showSMSModal = true;
    })
  }

  sendCode(){
    if(this.code.length == 6 && !this.code.includes('-')){
      let data = {
        code: this.code,
        msisdn: this.registerForm.msisdn
      }
      this.registerService.checkOTP(data).subscribe(res => {
        this.showSMSModal = false;
        this.signUpShow = true;
      })
    }
  }

  openFile(){
    window.open(this.file);
  }

}
