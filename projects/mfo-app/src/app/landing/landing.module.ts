import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

import { MainFormModule } from '../shared/main-form/main-form.module';
import { PdlFormModule } from "../shared/pdl-form/pdl-form.module";
import {TRANSLOCO_SCOPE, TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    TranslocoModule,
    CommonModule,
    LandingRoutingModule,
    MainFormModule,
    PdlFormModule
  ]
})
export class LandingModule { }
