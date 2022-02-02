import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{ path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) }, 
{ path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }, 
{ path: 'cabinet', loadChildren: () => import('./cabinet/cabinet.module').then(m => m.CabinetModule) },
{ path: 'payment', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
