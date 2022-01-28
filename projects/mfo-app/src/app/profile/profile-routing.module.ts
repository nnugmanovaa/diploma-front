import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'register', component: RegisterComponent }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
