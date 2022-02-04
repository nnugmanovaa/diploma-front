import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainFormComponent } from './main-form.component';
import { CommonModule } from '@angular/common';
let MainFormModule = class MainFormModule {
};
MainFormModule = __decorate([
    NgModule({
        declarations: [
            MainFormComponent
        ],
        exports: [MainFormComponent],
        imports: [
            ReactiveFormsModule,
            FormsModule,
            HttpClientModule,
            NgxSliderModule,
            CommonModule
        ],
        providers: [],
        bootstrap: []
    })
], MainFormModule);
export { MainFormModule };
//# sourceMappingURL=main-form.module.js.map