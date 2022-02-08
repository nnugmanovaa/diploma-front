import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../core/services/register.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';

declare function loadVideo():any;
declare function iinCheck(iin:any):any;

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
    this.loadScript('../assets/js/verilive.js');
    this.loadScript('../assets/js/checkiin.js');
    this.route.queryParams.subscribe(queryParams => {
      this.qparams = queryParams;
    });
    fromEvent(window,'build').subscribe((event:any)=>{
       this.showSignUP()
    })
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  veriLive(){
    this.verifaceLoad = false;
  }

  showSignUP(){
    let image = (<HTMLInputElement>document.getElementById("results")).value;
    if(!this.requestId){
      return;
    }
    this.registerService.sendImage(this.requestId, image).subscribe(res => {
      if(res.identified){
        this.getPersData();
      }else{
        this.toastr.warning('Пожалуйста попробуйте еще раз пройти идентификацию лица', '');
      }
    }, error => {
      this.registerService.resendImage(this.requestId, image).subscribe(res => {
        if(res.identified){
          this.getPersData();
        }else{
          this.toastr.warning('Пожалуйста попробуйте еще раз пройти идентификацию лица', '');
        }
      })
    })
  }

  getPersData(){
    this.registerService.getInfoByIIN(this.requestId).subscribe(res => {
      localStorage.setItem('pinfo', JSON.stringify(res));
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

  checkUser(){
    this.registerService.checkUser(this.registerForm.msisdn).subscribe(res => {
      if(!res.exist){
        this.registerUser()
      }else{
        this.toastr.error('Пользователь с таким номером уже зарегистрирован', 'Ошибка!');
      }
    })
  }

  registerUser(){
    if(this.pdfForm.iin){
      console.log(iinCheck(this.pdfForm.iin))
      if(!iinCheck(this.pdfForm.iin)){
        this.toastr.error('Вы ввели неверный ИИН!', 'Ошибка!');
        return;
      }
    }
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
