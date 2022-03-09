import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  imports: [
    TranslocoModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxSliderModule,
    CommonModule
  ],
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'register'
  }],
  bootstrap: []
})


export class RegisterModule { }
