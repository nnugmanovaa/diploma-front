import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { IMaskModule } from 'angular-imask';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
let PaymentModule = class PaymentModule {
};
PaymentModule = __decorate([
    NgModule({
        declarations: [PaymentComponent],
        imports: [
            CommonModule,
            PaymentRoutingModule,
            IMaskModule,
            ReactiveFormsModule,
            FormsModule
        ]
    })
], PaymentModule);
export { PaymentModule };
//# sourceMappingURL=payment.module.js.map