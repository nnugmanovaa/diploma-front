import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LandingComponent = class LandingComponent {
    constructor() {
        this.time = null;
        this.show = {};
        this.modal = false;
    }
    ngOnInit() {
        this.getMainTime();
    }
    getMainTime() {
        let oldDateObj = new Date();
        let newDateObj = new Date();
        newDateObj.setTime(oldDateObj.getTime() + (10 * 60 * 1000));
        this.time = ("0" + newDateObj.getHours()).slice(-2) + ':' + ("0" + newDateObj.getMinutes()).slice(-2);
    }
};
LandingComponent = __decorate([
    Component({
        selector: 'mfo-landing',
        templateUrl: './landing.component.html',
        styleUrls: ['./landing.component.scss']
    })
], LandingComponent);
export { LandingComponent };
//# sourceMappingURL=landing.component.js.map