import { __decorate } from "tslib";
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs/operators";
let AuthInterceptor = class AuthInterceptor {
    constructor(router, toastr) {
        this.router = router;
        this.toastr = toastr;
    }
    intercept(req, next) {
        const accessToken = localStorage.getItem('token');
        req = req.clone({
            setHeaders: {
                'Accept-Language': 'ru',
            },
        });
        if (accessToken) {
            // console.log(req)
            req = req.clone({
                setHeaders: {
                    'Authorization': `${accessToken}`,
                },
            });
        }
        return next.handle(req).pipe(tap(() => { }, (err) => {
            var _a, _b;
            if (err instanceof HttpErrorResponse) {
                // if (err.status === 401) {
                //   localStorage.removeItem('token');
                //   localStorage.removeItem('user');
                //   this.router.navigate(['/profile/login']);
                //   return;
                // }
                if ((_a = err.error) === null || _a === void 0 ? void 0 : _a.message) {
                    this.toastr.error((_b = err.error) === null || _b === void 0 ? void 0 : _b.message, 'Ошибка!');
                    return;
                }
            }
        }));
    }
};
AuthInterceptor = __decorate([
    Injectable()
], AuthInterceptor);
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptors.js.map