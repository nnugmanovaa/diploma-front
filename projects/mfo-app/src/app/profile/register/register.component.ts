import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RegisterService } from '../../core/services/register.service';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { fromEvent } from 'rxjs';
import amplitude from 'amplitude-js';

declare function iinCheck(iin: any): any;
declare const gtag: Function;

@Component({
  selector: 'mfo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  show: boolean = false;

  registerForm: any = {
    msisdn: null
  }

  pdfForm: any = {
    firstName: null,
    iin: null,
    lastName: null,
    patronymic: "",
    phone: null,
  }

  file: any = null;

  code: any = null;
  showSMSModal: boolean = false;

  showSmsCode: boolean = false;
  // msisdn:any = null;

  signUpShow: boolean = false;
  singUpForm: any = {
    "code": null,
    "msisdn": null,
    "password": null,
    "confirmPassword": null,
    "firstName": null,
    "iin": null,
    "lastName": null,
    "middleName": null,
  }

  qparams: any = null;
  disabled: any = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService,
    private toastr: ToastrService,
    private auth: AuthService) {

  }

  ngOnInit(): void {
    this.loadScript('../assets/js/checkiin.js');
    this.route.queryParams.subscribe(queryParams => {
      this.qparams = queryParams;
    });
    amplitude.getInstance().logEvent("started registration");
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  signUp() {
    if (this.singUpForm.password !== this.singUpForm.confirmPassword) {
      this.toastr.error('Пароль не изменён, так как новый пароль повторен неправильно.', 'Ошибка!');
      return;
    }
    this.singUpForm.code = this.code;
    this.singUpForm.msisdn = this.registerForm.msisdn;

    this.singUpForm.firstName = this.pdfForm.firstName;
    this.singUpForm.lastName = this.pdfForm.lastName;
    this.singUpForm.middleName = this.pdfForm.patronymic;
    this.singUpForm.iin = this.pdfForm.iin;

    this.disabled = true;
    this.registerService.signUp(this.singUpForm).subscribe(res => {
      if (res) {
        amplitude.getInstance().logEvent("registered");
        this.auth.saveUser(res);
        this.router.navigate(['/profile/verilive'], { queryParams: { ...this.qparams } })
      }
      this.disabled = false;
    }, error => {
      this.disabled = false;
    })
  }

  checkUser() {
    amplitude.getInstance().logEvent("clicked register");
    var currentAge = this.pdfForm.iin.slice(0, 2);
    var bornAge = this.pdfForm.iin.slice(6, 7);
    if ((bornAge == 1) || (bornAge == 2)) {
      var birthYear = 18 + currentAge;
    } else if ((bornAge == 3) || (bornAge == 4)) {
      var birthYear = 19 + currentAge;
    } else {
      var birthYear = 20 + currentAge;
    }
    var userAge = 2022 - birthYear;
    // console.log(userAge);
    this.registerService.checkUser(this.registerForm.msisdn).subscribe(res => {
      if (userAge < 21) {
        this.toastr.error('Минимальный возраст для получения займа - 21 год.', 'Ошибка!');
      } else if (userAge > 63) {
        this.toastr.error('Максимальный возраст для получения займа - 63 года.', 'Ошибка!');
      } else if (!res.exist) {
        gtag('event', 'conversion', {'send_to': 'AW-10848684799/3LsACL6H65cDEP-Vh7Uo'});
        this.registerUser()
      } else {
        this.toastr.error('Пользователь с таким номером уже зарегистрирован', 'Ошибка!');
      }
    });
  }

  registerUser() {
    if (this.pdfForm.iin) {
      console.log(iinCheck(this.pdfForm.iin))
      if (!iinCheck(this.pdfForm.iin)) {
        this.toastr.error('Вы ввели неверный ИИН!', 'Ошибка!');
        return;
      }
    }
    this.registerService.sendOTP(this.registerForm).subscribe(res => {
      amplitude.getInstance().logEvent("sms sent");
      this.getConsent();
    })
  }

  getConsent() {
    this.pdfForm.phone = this.registerForm.msisdn;
    this.registerService.getConsent(this.pdfForm).subscribe(res => {
      this.file = URL.createObjectURL(res);
      this.showSMSModal = true;
    })
  }

  sendCode() {
    if (this.code.length == 6 && !this.code.includes('-')) {
      let data = {
        code: this.code,
        msisdn: this.registerForm.msisdn
      }

      this.registerService.checkOTP(data).subscribe(
        res => {
          this.showSMSModal = false;
          this.signUpShow = true;
          amplitude.getInstance().logEvent("sms entered", { "success": true })
        },
        error => {
          amplitude.getInstance().logEvent("sms entered", { "success": false })
        }
      )
    }
  }

  openFile() {
    window.open(this.file);
  }

  signIn() {
    let eventProperties = {
      "position": 2
    };
    amplitude.getInstance().logEvent("clicked sign in", eventProperties);
  }
  sendSms() {
    this.auth.sendSms({ msisdn: this.registerForm.msisdn }).subscribe(res => {
      amplitude.getInstance().logEvent("sms resent");
      this.showSmsCode = true;
    })
  }

  togglePassword() {
    this.show = !this.show;
  }

}
