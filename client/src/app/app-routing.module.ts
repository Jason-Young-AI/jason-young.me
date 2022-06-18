import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { HiddenComponent } from './hidden/hidden.component';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

import { LostComponent } from './lost/lost.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Main' },

  { path: 'Main', component: MainComponent, loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'Admin', component: AdminComponent, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'Hidden', component: HiddenComponent, loadChildren: () => import('./hidden/hidden.module').then(m => m.HiddenModule) },

  { path: 'SignIn', component: SigninComponent },
  { path: 'SignUp', component: SignupComponent },

  { path: '**', component: LostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
