import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(route, router, auth) {
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.loginForm = {
            username: '',
            password: ''
        };
        this.returnUrl = "";
    }
    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/cabinet';
    }
    loginUser() {
        this.auth.login(this.loginForm).subscribe(res => {
            if (res) {
                this.auth.saveUser(res);
                this.router.navigateByUrl(this.returnUrl);
            }
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'mfo-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map