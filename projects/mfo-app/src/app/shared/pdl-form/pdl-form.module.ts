import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PdlFormComponent } from './pdl-form.component';
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [
    PdlFormComponent
  ],
  exports: [PdlFormComponent],
  imports: [
    CommonModule,
    NgxSliderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  bootstrap: []
})

export class PdlFormModule { }
