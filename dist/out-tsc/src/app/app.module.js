import { __decorate } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { HeaderComponent } from './shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './core/interceptors/auth.interceptors';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MainFormModule } from './shared/main-form/main-form.module';
registerLocaleData(localeRu, 'ru');
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            HeaderComponent
        ],
        exports: [],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
            BrowserModule,
            AppRoutingModule,
            ReactiveFormsModule,
            FormsModule,
            HttpClientModule,
            MainFormModule,
            NgxSliderModule,
            BrowserAnimationsModule,
            ToastrModule.forRoot(),
        ],
        providers: [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true,
            },
            { provide: LOCALE_ID, useValue: 'ru' },
            // {provide: LocationStrategy, useClass: HashLocationStrategy}
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map