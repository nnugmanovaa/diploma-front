import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ChangePasswordComponent = class ChangePasswordComponent {
    constructor(route, router, auth, toastr) {
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.toastr = toastr;
        this.passwordForm = {
            oldPassword: null,
            newPassword: null,
            password: null
        };
    }
    ngOnInit() {
        var _a;
        this.passwordForm.username = (_a = this.auth.getUser) === null || _a === void 0 ? void 0 : _a.username;
    }
    submitForm() {
        if (this.passwordForm.newPassword !== this.passwordForm.password) {
            this.toastr.error('Пароль не изменён, так как новый пароль повторен неправильно.', 'Ошибка!');
            return;
        }
        this.auth.resetPassword(this.passwordForm).subscribe(res => {
            if (res) {
                this.auth.saveUser(res);
                // this.router.navigate(['/cabinet'])
                this.toastr.success('Пароль изменён', 'Персональные данные');
            }
        });
    }
};
ChangePasswordComponent = __decorate([
    Component({
        selector: 'mfo-change-password',
        templateUrl: './change-password.component.html',
        styleUrls: ['./change-password.component.scss']
    })
], ChangePasswordComponent);
export { ChangePasswordComponent };
//# sourceMappingURL=change-password.component.js.map