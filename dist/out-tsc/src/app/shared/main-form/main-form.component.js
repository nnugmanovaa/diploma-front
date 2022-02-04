import { __decorate } from "tslib";
import { Component } from '@angular/core';
let MainFormComponent = class MainFormComponent {
    constructor(route, router, authService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.form = {
            period: 6,
            amount: 250000,
            type: 'ANNUITY_PAYMENTS'
        };
        this.value = 6;
        this.monthOptions = {
            floor: 0,
            ceil: 12,
            showSelectionBar: true,
            minLimit: 2
        };
        this.priceOptions = {
            floor: 0,
            minLimit: 50000,
            ceil: 500000,
            step: 5000,
            showSelectionBar: true,
            showTicks: true,
        };
        this.paymentPerMonth = null;
    }
    ngOnInit() {
        this.calculateForm();
    }
    calculateForm() {
        this.paymentPerMonth = this.getPayment(this.form.amount, this.form.period, 0.38);
    }
    getPayment(sum, period, rate) {
        console.log(sum, period);
        var i, koef, result;
        i = (rate / 12);
        koef = (i * (Math.pow(1 + i, period))) / (Math.pow(1 + i, period) - 1);
        result = sum * koef;
        return result.toFixed();
    }
    ;
    createRequest() {
        if (this.authService.isLoggedIn) {
            this.router.navigate(['/profile/steps'], {
                queryParams: this.form
            });
        }
        else {
            this.router.navigate(['/profile/register'], {
                queryParams: this.form
            });
        }
    }
};
MainFormComponent = __decorate([
    Component({
        selector: 'mfo-main-form',
        templateUrl: './main-form.component.html',
        styleUrls: ['./main-form.component.scss']
    })
], MainFormComponent);
export { MainFormComponent };
//# sourceMappingURL=main-form.component.js.map