import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { CashedOutComponent } from './cashed-out/cashed-out.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ContactsComponent } from './contacts/contacts.component';
import { PaymenttypesComponent } from './paymenttypes/paymenttypes.component';
import { DeferredPaymentComponent } from './deferred-payment/deferred-payment.component';
import { SettingsComponent } from './settings/settings.component';
const routes = [
    { path: '', component: CabinetComponent, children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'cashed-out'
            },
            {
                path: 'cashed-out', component: CashedOutComponent
            },
            {
                path: 'history', component: OrderHistoryComponent
            },
            {
                path: 'change-password', component: ChangePasswordComponent
            },
            {
                path: 'contacts', component: ContactsComponent
            },
            {
                path: 'payment-types', component: PaymenttypesComponent
            },
            {
                path: 'deferred-payment', component: DeferredPaymentComponent
            },
            {
                path: 'settings', component: SettingsComponent
            }
        ] }
];
let CabinetRoutingModule = class CabinetRoutingModule {
};
CabinetRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], CabinetRoutingModule);
export { CabinetRoutingModule };
//# sourceMappingURL=cabinet-routing.module.js.map