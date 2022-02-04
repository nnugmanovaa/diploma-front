import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
const routes = [{ path: '', component: LandingComponent }];
let LandingRoutingModule = class LandingRoutingModule {
};
LandingRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], LandingRoutingModule);
export { LandingRoutingModule };
//# sourceMappingURL=landing-routing.module.js.map