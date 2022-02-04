import { __decorate } from "tslib";
import { Component } from '@angular/core';
export var Status;
(function (Status) {
    Status["APPROVED"] = "\u041E\u0434\u043E\u0431\u0440\u0435\u043D";
    Status["REJECTED"] = "\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D";
    Status["CLOSED"] = "\u0417\u0430\u043A\u0440\u044B\u0442";
    Status["CASH_OUT_CARD_INITIALIZED"] = "\u041E\u0431\u043D\u0430\u043B\u0438\u0447\u0438\u0432\u0430\u043D\u0438\u0435";
})(Status || (Status = {}));
let OrderHistoryComponent = class OrderHistoryComponent {
    constructor(cabinet) {
        this.cabinet = cabinet;
        this.params = {
            startDate: '',
            endDate: '',
            page: 0,
            size: 6,
            status: 'CASHED_OUT_CARD'
        };
        this.Status = Status;
        this.date = null;
        this.list = null;
    }
    ngOnInit() {
        let currentDate = new Date();
        let start = new Date();
        start.setMonth(currentDate.getMonth() - 12);
        this.params.startDate = start.toISOString().split('T')[0];
        this.params.endDate = currentDate.toISOString().split('T')[0];
        this.getOrders();
    }
    counter(i) {
        return new Array(i);
    }
    changePage(page, change = true) {
        if (change) {
            this.params.page = page;
            this.getOrders();
        }
    }
    getOrders() {
        this.cabinet.getOrders(this.params).subscribe(res => {
            this.list = res;
        });
    }
};
OrderHistoryComponent = __decorate([
    Component({
        selector: 'mfo-order-history',
        templateUrl: './order-history.component.html',
        styleUrls: ['./order-history.component.scss']
    })
], OrderHistoryComponent);
export { OrderHistoryComponent };
//# sourceMappingURL=order-history.component.js.map