import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register/register.component';
import { IMaskModule } from 'angular-imask';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { MainFormModule } from '../shared/main-form/main-form.module';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { StepsComponent } from './steps/steps.component';
import { VeriliveComponent } from './verilive/verilive.component';

@NgModule({
  declarations: [ProfileComponent, RegisterComponent, LoginComponent, ForgotPassComponent, StepsComponent, VeriliveComponent],
  imports: [
    IMaskModule,
    ProfileRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    CommonModule,
    MainFormModule
  ]
})
export class ProfileModule { }
