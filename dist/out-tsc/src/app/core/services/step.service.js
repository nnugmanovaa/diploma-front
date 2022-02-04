import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let StepService = class StepService {
    constructor(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.REST_API_SERVER = environment.API_URL;
        this.LOAN_URL = environment.LOAN_URL;
    }
    getLocations(id = 2) {
        return this.httpClient.get(`${this.REST_API_SERVER}/v1/location/level/${id}`);
    }
    getCities(id) {
        return this.httpClient.get(`${this.REST_API_SERVER}/v1/location/${id}/children`);
    }
    submitStep(data) {
        return this.httpClient.post(`${this.LOAN_URL}/score/start-loan-process`, data);
    }
    getAnketa(id) {
        return this.httpClient.get(`${this.LOAN_URL}/orders/loan-debtor-form/${id}`, { responseType: 'blob' });
    }
    getContract(id) {
        return this.httpClient.get(`${this.LOAN_URL}/orders/${id}/contract`, { responseType: 'blob' });
    }
    payoutCard(data) {
        return this.httpClient.post(`${this.LOAN_URL}/payout/card`, data);
    }
    changeCardStatus(id) {
        return this.httpClient.put(`${this.LOAN_URL}/orders/${id}/approve`, {});
    }
};
StepService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], StepService);
export { StepService };
//# sourceMappingURL=step.service.js.map