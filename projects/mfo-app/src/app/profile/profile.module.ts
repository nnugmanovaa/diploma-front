import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register/register.component';
import { IMaskModule } from 'angular-imask';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ProfileComponent, RegisterComponent],
  imports: [
    IMaskModule,
    ProfileRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    CommonModule,
  ]
})
export class ProfileModule { }
