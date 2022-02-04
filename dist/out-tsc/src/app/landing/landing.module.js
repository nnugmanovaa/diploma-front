import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { MainFormModule } from '../shared/main-form/main-form.module';
let LandingModule = class LandingModule {
};
LandingModule = __decorate([
    NgModule({
        declarations: [LandingComponent],
        imports: [
            CommonModule,
            LandingRoutingModule,
            MainFormModule
        ]
    })
], LandingModule);
export { LandingModule };
//# sourceMappingURL=landing.module.js.map