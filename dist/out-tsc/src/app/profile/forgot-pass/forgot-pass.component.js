import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ForgotPassComponent = class ForgotPassComponent {
    constructor(route, router, auth) {
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.msisdn = null;
        this.code = "";
        this.newPassword = null;
        this.showSmsCode = false;
    }
    ngOnInit() {
    }
    sendSms() {
        this.auth.sendSms({ msisdn: this.msisdn }).subscribe(res => {
            this.showSmsCode = true;
        });
    }
    sendSmsCode() {
        let data = {
            msisdn: this.msisdn,
            code: this.code,
            newPassword: this.newPassword
        };
        this.auth.sendSmsCode(data).subscribe(res => {
            if (res) {
                this.auth.saveUser(res);
                this.router.navigate(['/cabinet']);
            }
        });
    }
};
ForgotPassComponent = __decorate([
    Component({
        selector: 'mfo-forgot-pass',
        templateUrl: './forgot-pass.component.html',
        styleUrls: ['./forgot-pass.component.scss']
    })
], ForgotPassComponent);
export { ForgotPassComponent };
//# sourceMappingURL=forgot-pass.component.js.map