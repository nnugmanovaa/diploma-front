import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { DropdownModule } from '../shared/dropdown/dropdown.module';

import { IMaskModule } from 'angular-imask';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    TranslocoModule,
    CommonModule,
    PaymentRoutingModule,
    IMaskModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule
  ]
})
export class PaymentModule { }
