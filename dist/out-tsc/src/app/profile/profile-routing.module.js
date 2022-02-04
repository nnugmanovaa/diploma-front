import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { StepsComponent } from './steps/steps.component';
const routes = [
    { path: '', component: ProfileComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-pass', component: ForgotPassComponent },
    { path: 'steps', component: StepsComponent },
];
let ProfileRoutingModule = class ProfileRoutingModule {
};
ProfileRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ProfileRoutingModule);
export { ProfileRoutingModule };
//# sourceMappingURL=profile-routing.module.js.map