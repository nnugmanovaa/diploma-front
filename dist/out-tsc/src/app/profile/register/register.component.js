import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
let RegisterComponent = class RegisterComponent {
    constructor(route, router, registerService, toastr, auth) {
        this.route = route;
        this.router = router;
        this.registerService = registerService;
        this.toastr = toastr;
        this.auth = auth;
        this.registerForm = {
            msisdn: null
        };
        this.pdfForm = {
            firstName: null,
            iin: null,
            lastName: null,
            patronymic: null,
            phone: null,
        };
        this.file = null;
        this.code = null;
        this.showSMSModal = false;
        this.veriface = false;
        this.signUpShow = false;
        this.singUpForm = {
            "code": null,
            "msisdn": null,
            "password": null,
            "confirmPassword": null
        };
        this.verifaceLoad = true;
        this.vfImage = true;
        this.qparams = null;
        this.requestId = null;
    }
    ngOnInit() {
        this.loadScript('../assets/js/verilive.js');
        this.loadScript('../assets/js/checkiin.js');
        this.route.queryParams.subscribe(queryParams => {
            this.qparams = queryParams;
        });
        fromEvent(window, 'build').subscribe((event) => {
            this.showSignUP();
        });
    }
    loadScript(url) {
        const body = document.body;
        const script = document.createElement('script');
        script.innerHTML = '';
        script.src = url;
        script.async = false;
        script.defer = true;
        body.appendChild(script);
        console.log("load");
    }
    veriLive() {
        this.verifaceLoad = false;
    }
    showSignUP() {
        let image = document.getElementById("results").value;
        this.registerService.sendImage(this.requestId, image).subscribe(res => {
            this.getPersData();
        }, error => {
            this.registerService.resendImage(this.requestId, image).subscribe(res => {
                this.getPersData();
            });
        });
    }
    getPersData() {
        this.registerService.getInfoByIIN(this.requestId).subscribe(res => {
            localStorage.setItem('pinfo', JSON.stringify(res));
            this.router.navigate(['/profile/steps'], { queryParams: Object.assign(Object.assign({}, this.qparams), { requestId: this.requestId }) });
        });
    }
    createRequest() {
        this.registerService.getLoanRequestId(this.pdfForm).subscribe(res => {
            this.requestId = res.requestId;
            this.veriface = true;
        });
    }
    signUp() {
        if (this.singUpForm.password !== this.singUpForm.confirmPassword) {
            this.toastr.error('Пароль не изменён, так как новый пароль повторен неправильно.', 'Ошибка!');
            return;
        }
        this.singUpForm.code = this.code;
        this.singUpForm.msisdn = this.registerForm.msisdn;
        this.registerService.signUp(this.singUpForm).subscribe(res => {
            if (res) {
                this.auth.saveUser(res);
                this.createRequest();
            }
        });
    }
    registerUser() {
        if (this.pdfForm.iin) {
            console.log(iinCheck(this.pdfForm.iin));
            if (!iinCheck(this.pdfForm.iin)) {
                this.toastr.error('Вы ввели неверный ИИН!', 'Ошибка!');
                return;
            }
        }
        this.registerService.sendOTP(this.registerForm).subscribe(res => {
            this.getConsent();
        });
    }
    getConsent() {
        this.pdfForm.phone = this.registerForm.msisdn;
        this.registerService.getConsent(this.pdfForm).subscribe(res => {
            this.file = URL.createObjectURL(res);
            this.showSMSModal = true;
        });
    }
    sendCode() {
        if (this.code.length == 6 && !this.code.includes('-')) {
            let data = {
                code: this.code,
                msisdn: this.registerForm.msisdn
            };
            this.registerService.checkOTP(data).subscribe(res => {
                this.showSMSModal = false;
                this.signUpShow = true;
            });
        }
    }
    openFile() {
        window.open(this.file);
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'mfo-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.scss']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map