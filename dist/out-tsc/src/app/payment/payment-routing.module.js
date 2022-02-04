import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentComponent } from './payment.component';
const routes = [{ path: '', component: PaymentComponent }];
let PaymentRoutingModule = class PaymentRoutingModule {
};
PaymentRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PaymentRoutingModule);
export { PaymentRoutingModule };
//# sourceMappingURL=payment-routing.module.js.map