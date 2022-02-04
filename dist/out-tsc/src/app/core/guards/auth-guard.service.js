import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate(route, state) {
        if (localStorage.getItem('user')) {
            return true;
        }
        this.router.navigate(['profile/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
};
AuthGuard = __decorate([
    Injectable()
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth-guard.service.js.map