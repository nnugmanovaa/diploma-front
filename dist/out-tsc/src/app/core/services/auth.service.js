import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let AuthService = class AuthService {
    constructor(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.REST_API_SERVER = environment.API_URL;
        this.ADMIN_URL = environment.ADMIN_URL;
        this.LOAN_URL = environment.LOAN_URL;
    }
    login(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/v1/auth/signin/`, data);
    }
    saveUser(user) {
        this.user = user;
        localStorage.setItem('token', this.user.type + ' ' + this.user.token);
        localStorage.setItem('user', JSON.stringify(this.user));
    }
    resetPassword(data) {
        return this.httpClient.post(`${this.ADMIN_URL}/users/change-password/`, data);
    }
    changePassword(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/v1/password/change/`, data);
    }
    payment(data) {
        return this.httpClient.post(`${this.LOAN_URL}/loans/init-payment`, data);
    }
    sendSms(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/v1/phone-verification`, data);
    }
    sendSmsCode(data) {
        return this.httpClient.put(`${this.REST_API_SERVER}/v1/auth/pass-reset`, data);
    }
    getUserId(phone) {
        return this.httpClient.get(`${this.LOAN_URL}/clients/${phone}`);
    }
    CreateUserPasport(data, id) {
        return this.httpClient.post(`${this.REST_API_SERVER}/clients/passport-info/{id}`, data);
    }
    get isLoggedIn() {
        const token = localStorage.getItem('token');
        return token !== null;
    }
    get getUser() {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('pinfo');
        this.router.navigate(['/']);
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map