import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from "./core/guards/auth-guard.service";
const routes = [
    { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
    { path: 'cabinet', loadChildren: () => import('./cabinet/cabinet.module').then(m => m.CabinetModule), canActivate: [AuthGuard] },
    { path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes, {
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled'
            })],
        exports: [RouterModule],
        providers: [AuthGuard]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map