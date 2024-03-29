import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainFormComponent } from './main-form.component';
import { CommonModule } from '@angular/common';
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';


@NgModule({
  declarations: [
    MainFormComponent
  ],
  exports:[MainFormComponent],
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
    useValue: 'main-form'
  }],
  bootstrap: []
})


export class MainFormModule { }
