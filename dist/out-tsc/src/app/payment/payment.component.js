import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PaymentComponent = class PaymentComponent {
    constructor(auth, cabinet) {
        this.auth = auth;
        this.cabinet = cabinet;
        this.priceMask = {
            mask: [
                { mask: '' },
                {
                    mask: 'num ₸',
                    lazy: false,
                    blocks: {
                        num: {
                            mask: Number,
                            scale: 2,
                            thousandsSeparator: ' ',
                            radix: ',',
                            mapToRadix: ['.'],
                            max: 500000
                        }
                    }
                }
            ]
        };
        this.payForm = {
            "username": "",
            "amountRemain": "",
            "monthPayment": "",
            "amount": "",
            "clientRef": "",
            "contractDate": "",
            "contractNumber": "",
            "loanRepayType": "PLANNED_REPAYMENT"
        };
    }
    ngOnInit() {
        if (this.auth.isLoggedIn) {
            this.payForm.username = this.auth.getUser.username;
            this.getUserByPhone();
            this.getActiveLoan();
        }
    }
    getUserByPhone() {
        this.auth.getUserId(this.payForm.username).subscribe(res => {
            this.payForm.clientRef = res.iin;
        });
    }
    getActiveLoan() {
        this.cabinet.getSchedule().subscribe(res => {
            var _a, _b, _c, _d, _e;
            this.payForm.contractNumber = (_a = res.orderDetailsSchedule) === null || _a === void 0 ? void 0 : _a.contract;
            this.payForm.contractDate = (_b = res.orderDetailsSchedule) === null || _b === void 0 ? void 0 : _b.contractDate;
            this.payForm.monthPayment = (_c = res.orderDetailsSchedule) === null || _c === void 0 ? void 0 : _c.monthPayment;
            this.payForm.amountRemain = (_d = res.orderDetailsSchedule) === null || _d === void 0 ? void 0 : _d.amountRemain;
            this.payForm.amount = String((_e = res.orderDetailsSchedule) === null || _e === void 0 ? void 0 : _e.monthPayment);
        });
    }
    payCredit() {
        this.auth.payment(this.payForm).subscribe(res => {
            window.open(res.url);
        });
    }
    setAmout() {
        if (this.payForm.loanRepayType == 'PLANNED_REPAYMENT') {
            this.payForm.amount = String(this.payForm.monthPayment);
        }
        else {
            this.payForm.amount = String(this.payForm.amountRemain);
        }
    }
};
PaymentComponent = __decorate([
    Component({
        selector: 'mfo-payment',
        templateUrl: './payment.component.html',
        styleUrls: ['./payment.component.scss']
    })
], PaymentComponent);
export { PaymentComponent };
//# sourceMappingURL=payment.component.js.map