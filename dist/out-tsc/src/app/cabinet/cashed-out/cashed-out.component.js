import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CashedOutComponent = class CashedOutComponent {
    constructor(cabinet) {
        this.cabinet = cabinet;
        this.loan = null;
    }
    ngOnInit() {
        this.getSchedule();
    }
    getSchedule() {
        this.cabinet.getSchedule().subscribe(res => {
            this.loan = res;
        });
    }
};
CashedOutComponent = __decorate([
    Component({
        selector: 'mfo-cashed-out',
        templateUrl: './cashed-out.component.html',
        styleUrls: ['./cashed-out.component.scss']
    })
], CashedOutComponent);
export { CashedOutComponent };
//# sourceMappingURL=cashed-out.component.js.map