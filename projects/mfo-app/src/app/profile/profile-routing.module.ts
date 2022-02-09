import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { StepsComponent } from './steps/steps.component';
import { VeriliveComponent } from './verilive/verilive.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verilive', component: VeriliveComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-pass', component: ForgotPassComponent },
  { path: 'steps', component: StepsComponent },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
