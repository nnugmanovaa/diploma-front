import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderHistoryComponent } from './order-history.component';
import { CommonModule } from '@angular/common';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [OrderHistoryComponent],
  exports: [OrderHistoryComponent],
  imports: [
    TranslocoModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSliderModule,
    CommonModule
  ],
  // providers: [{
  //   provide: TRANSLOCO_SCOPE,
  //   useValue: 'order-history'
  // }],
  bootstrap: []
})


export class OrderHistoryModule { }
