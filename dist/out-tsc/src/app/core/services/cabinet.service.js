import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let CabinetService = class CabinetService {
    constructor(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.REST_API_SERVER = environment.LOAN_URL;
    }
    getOrders(params) {
        return this.httpClient.get(`${this.REST_API_SERVER}/orders`, { params });
    }
    getActiveOrders(data) {
        return this.httpClient.post(`${this.REST_API_SERVER}/loans/account-loans`, data);
    }
    getSchedule() {
        return this.httpClient.get(`${this.REST_API_SERVER}/orders/repayment-schedule`);
    }
};
CabinetService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CabinetService);
export { CabinetService };
//# sourceMappingURL=cabinet.service.js.map