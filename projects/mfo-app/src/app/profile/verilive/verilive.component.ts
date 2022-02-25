import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../core/services/register.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import amplitude from 'amplitude-js';

declare function loadVideo():any;

@Component({
  selector: 'mfo-verilive',
  templateUrl: './verilive.component.html',
  styleUrls: ['./verilive.component.scss']
})
export class VeriliveComponent implements OnInit {

  user:any = {
    firstName: null,
    iin: null,
    lastName: null,
    patronymic: null,
    phone: null,
  }

  verifaceLoad:boolean = true;
  vfImage:boolean = true;

  requestId:any = null;

  qparams:any = null;

  disabled:boolean = false;

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
    this.createRequest();
    this.loadScript('https://s3.eu-central-1.amazonaws.com/verilive-statics.verigram.ai/verilive.js');
    this.loadScript('../assets/js/verilive.js');
    fromEvent(window,'build').subscribe((event:any)=>{
       this.showSignUP(),
        (error: any) => {
          console.log("error");
        } 
    })
  }

  changeStatus(){
    let data = this.auth.getUser;
    data.identificationStatus = "FULL_IDENTIFIED"
    this.auth.saveUser(data);
  }

  createRequest(){
    let data = this.auth.getUser;
    this.user.firstName = data.firstName;
    this.user.lastName = data.lastName;
    this.user.phone = data.username;
    this.user.iin = data.iin;

    this.registerService.getLoanRequestId(this.user).subscribe(res => {
      this.requestId = res.requestId
      // this.router.navigate(['/profile/verilive'], { queryParams: {...this.qparams, requestId:this.requestId}})
    })
  }


  showSignUP(){
    // console.log("123");
    let image = (<HTMLInputElement>document.getElementById("results")).value;
    if(!this.requestId){
      return;
    }
    this.disabled = true;
    this.registerService.sendImage(this.requestId, image).subscribe(res => {
      if(res.identified){
        amplitude.getInstance().logEvent("finished identification", {"success": true})
        this.changeStatus();
        this.getPersData();
        this.disabled = false;
      }else{
        this.disabled = false;
        this.toastr.warning('Пожалуйста попробуйте еще раз пройти идентификацию лица', '');
      }
    }, error => {
      this.registerService.resendImage(this.requestId, image).subscribe(res => {
        if(res.identified){
          amplitude.getInstance().logEvent("finished identification", {"success": true})
          this.changeStatus();
          this.getPersData();
          this.disabled = false;
        }else{
          this.disabled = false;
          this.toastr.warning('Пожалуйста попробуйте еще раз пройти идентификацию лица', '');
        }
      }, error => {
        amplitude.getInstance().logEvent("finished identification", {"success": false})
        this.disabled = false;
      })
    })
  }

  getPersData(){
    this.registerService.getInfoByIIN(this.requestId).subscribe(res => {
      localStorage.setItem('pinfo', JSON.stringify(res));
      this.router.navigate(['/profile/steps'], { queryParams: {...this.qparams, requestId:this.requestId}})
    });
  }

  veriLive(){
    amplitude.getInstance().logEvent("started identification");
    this.verifaceLoad = false;
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

}
