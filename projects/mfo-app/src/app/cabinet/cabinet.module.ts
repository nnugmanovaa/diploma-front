import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import { CashedOutComponent } from './cashed-out/cashed-out.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContactsComponent } from './contacts/contacts.component';
import { PaymenttypesComponent } from './paymenttypes/paymenttypes.component';
import { DeferredPaymentComponent } from './deferred-payment/deferred-payment.component';
import { SettingsComponent } from './settings/settings.component';
import { MainFormModule } from '../shared/main-form/main-form.module';

@NgModule({
  declarations: [CabinetComponent, CashedOutComponent, OrderHistoryComponent, ChangePasswordComponent, ContactsComponent, PaymenttypesComponent, DeferredPaymentComponent, SettingsComponent],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    MainFormModule
  ]
})
export class CabinetModule { }
