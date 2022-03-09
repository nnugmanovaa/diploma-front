import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StepsComponent } from './steps.component';
import { CommonModule } from '@angular/common';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';


@NgModule({
  declarations: [StepsComponent],
  exports: [StepsComponent],
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
    useValue: 'steps'
  }],
  bootstrap: []
})


export class RegisterModule { }
