import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let RegisterService = class RegisterService {
    constructor(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.REST_API_SERVER = environment.API_URL;
        this.LOAN_URL = environment.LOAN_URL;
    }
    sendOTP(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/v1/phone-verification`, data);
    }
    signUp(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/v1/auth/signup`, data);
    }
    checkOTP(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/v1/phone-verification/check`, data);
    }
    getConsent(params) {
        return this.httpClient.get(`${this.REST_API_SERVER}/v1/loan/consent`, { params, responseType: 'blob' });
    }
    getLoanRequestId(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/v1/loan`, data);
    }
    getInfoByIIN(reqid) {
        return this.httpClient.get(`${this.REST_API_SERVER}/v1/loan/${reqid}/personal-data`);
    }
    sendImage(reqid, image) {
        return this.httpClient.put(`${this.REST_API_SERVER}/v1/loan/${reqid}/match-identity`, image);
    }
    resendImage(reqid, image) {
        return this.httpClient.put(`${this.REST_API_SERVER}/v1/loan/${reqid}/identity/result`, image);
    }
};
RegisterService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RegisterService);
export { RegisterService };
//# sourceMappingURL=register.service.js.map